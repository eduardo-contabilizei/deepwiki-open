# Plan: Add New Language Version by Translating Existing Wiki Cache

This document outlines the plan to implement functionality that allows users to create a new language version of an existing wiki by translating its cached content. This avoids re-processing the entire repository with an LLM for generation, focusing instead on translating structured text.

## Core Idea

Leverage the existing wiki cache (JSON files in `~/.adalflow/wikicache/`) which contains structured content (titles, HTML content, summaries). A new backend endpoint will read a specified source language cache, send its textual content to a translation service (likely an existing LLM integration like OpenAI, Bedrock, or OpenRouter), and then save the translated content as a new cache file for the target language.

## Phase 1: Backend Implementation (Python - `api/api.py`, `rag.py`, LLM Clients)

1.  **Define Pydantic Models (in `api/api.py` or a dedicated `schemas.py`):
    *   `TranslateWikiRequest(BaseModel)`:
        *   `owner: str`
        *   `repo: str`
        *   `repo_type: str`
        *   `source_language: str` (e.g., 'en')
        *   `target_language: str` (e.g., 'pt-BR')
    *   `TranslateWikiResponse(BaseModel)`:
        *   `status: str` (e.g., 'success', 'error')
        *   `message: str`
        *   `new_cache_path: Optional[str]` (path to the newly created translated cache file)

2.  **New API Endpoint in `api/api.py`:**
    *   Define an endpoint, e.g., `@app.post("/api/wiki_translate", response_model=TranslateWikiResponse)`.
    *   This endpoint will accept `TranslateWikiRequest` data.
    *   The handler function (e.g., `async def translate_existing_wiki_content(request_data: TranslateWikiRequest):`) will orchestrate the translation process.

3.  **Core Translation Logic (New function, e.g., `perform_translation_of_cached_wiki` in `api/rag.py` or a new `translation_service.py`):
    *   **Load Source Cache:** Use the existing `read_wiki_cache(owner, repo, repo_type, source_language)` to fetch the `WikiCacheData` object for the source language.
    *   **Error Handling:** If source cache doesn't exist, return an appropriate error.
    *   **Check Target Cache:** Optionally, check if a cache for the `target_language` already exists. Decide on a policy (e.g., fail, or allow overwrite with a flag in the request).
    *   **Identify Translatable Fields:** The `WikiCacheData` (likely a dictionary) contains `wiki_data` (list of `WikiPage` objects) and `page_summaries`. Key fields for translation within each `WikiPage` are `title` (string) and `content` (HTML string). Also, `page_summaries` (dictionary of pageId to summary string) need translation.
    *   **Deep Copy Data:** Create a deep copy of the source `WikiCacheData` to modify for the target language.
    *   **Iterate and Translate:**
        *   For each `WikiPage` in `wiki_data`:
            *   Translate `page.title`.
            *   Translate `page.content`. **Crucially, the translation must preserve HTML tags and structure.** The LLM prompt needs to be specific about this.
        *   For each `summary` in `page_summaries`:
            *   Translate the summary string.
    *   **Construct Translated `WikiCacheData`:** Update the copied data structure with all translated text.
    *   **Save Translated Cache:** Use the existing `save_wiki_cache` function. The input to `save_wiki_cache` is `WikiCacheRequest`, so the translated `wiki_data`, `page_summaries`, etc., along with `owner`, `repo`, `repo_type`, and the *new* `target_language` must be packaged into this model before saving. This will create a new file like `deepwiki_cache_{repo_type}_{owner}_{repo}_{target_language}.json`.

4.  **Enhance LLM Client (e.g., `api/openai_client.py`, `api/bedrock_client.py`):
    *   Add a new generic translation method, e.g., `async def translate_text_content(text: str, source_language_name: str, target_language_name: str, preserve_html: bool = False) -> str:`.
    *   This method will construct a precise prompt for the LLM. If `preserve_html` is true, the prompt must instruct the LLM to maintain HTML tags and structure, only translating the textual content within them.
        *   Example prompt fragment: "Translate the following HTML content from {source_language_name} to {target_language_name}. IMPORTANT: Preserve all HTML tags and their attributes exactly as they are. Only translate the human-readable text content enclosed within these tags."

## Phase 2: Frontend Implementation (Next.js/React)

1.  **UI for Initiating Translation (e.g., in `src/components/ProcessedProjects.tsx`):
    *   **Button:** Add a "Translate" or "Add Language Version" icon/button next to each listed project.
    *   **Modal/Form:** On click, open a modal that:
        *   Displays source project details (Owner, Repo, current Language).
        *   Provides a dropdown to select the `target_language`. This dropdown should be populated from the `locales` array in `src/i18n.ts`, filtering out the `source_language` and any languages already existing for that project.
        *   A "Start Translation" button.

2.  **Frontend Logic to Call API (`ProcessedProjects.tsx` or a dedicated service):
    *   Create a new function, e.g., `async function handleRequestWikiTranslation(project: ProcessedProject, targetLanguage: string):`.
    *   This function will construct the `TranslateWikiRequest` payload.
    *   Make a `POST` request to the new `/api/wiki_translate` endpoint.
    *   **User Feedback:** Implement loading indicators (e.g., disable button, show spinner) as translation can take time.
    *   On successful API response:
        *   Show a success message (e.g., using a toast notification).
        *   Refresh the list of processed projects by calling `fetchProjects()` again to show the new language version.
    *   On API error:
        *   Display a clear error message to the user.

3.  **Update Translation Strings (`defaultMessages` in `ProcessedProjects.tsx` and `src/messages/`):
    *   Add new keys for UI elements like "Translate Wiki", "Select Target Language", "Start Translation".
    *   Add keys for feedback messages: "Translation started for {repo_name} to {target_language}...", "Translation successful!", "Translation failed: {error_message}".

## Phase 3: Error Handling and Edge Cases

*   **Backend:**
    *   Handle cases where the source wiki cache file is not found.
    *   Handle LLM API errors gracefully (e.g., rate limits, API key issues, model errors), returning informative messages to the frontend.
    *   Consider what happens if a translation partially fails (e.g., some pages translate, others don't). For an initial version, failing the entire process might be simpler.
    *   Ensure file operations (read/write) are robust.
*   **Frontend:**
    *   Clearly display errors returned from the backend.
    *   Handle network request failures.
    *   Prevent duplicate translation requests if one is already in progress for the same target language.

## Phase 4: Testing

*   Test with various wiki structures and content types.
*   Verify HTML integrity after translation.
*   Test with all supported source and target languages.
*   Test error conditions thoroughly.

This plan provides a roadmap for implementing the translation feature. Each phase and step will require careful implementation and testing.
