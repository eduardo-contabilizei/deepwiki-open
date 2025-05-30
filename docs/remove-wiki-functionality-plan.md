# Plan for Implementing "Remove a Wiki" Functionality

This document outlines the steps to implement the functionality to remove a wiki in the DeepWiki-Open project.

**Assumption:** "Remove a Wiki" for this plan means removing a specific language version of a cached wiki, utilizing the existing `DELETE /api/wiki_cache` backend endpoint. If removing *all* language versions for a project is required, the backend endpoint would need modification, which can be a subsequent step.

## Phase 1: Backend Verification (Python - `api/api.py`)

*   **Status:** Mostly complete. The `DELETE /api/wiki_cache` endpoint in `api/api.py` is suitable.
    *   It correctly identifies the cache file using `owner`, `repo`, `repo_type`, and `language`.
    *   It uses `os.remove` (via `asyncio.to_thread`) to delete the file.
    *   It handles cases where the file doesn't exist, returning a `{"status": "not_found", ...}`.
    *   It returns `{"status": "success", ...}` on successful deletion.
    *   **No immediate backend changes are needed for deleting a single language version.**

## Phase 2: Frontend Implementation (Next.js/React)

### A. `src/components/ProcessedProjects.tsx` (Project Listing Page)

1.  **Import Delete Icon:**
    *   Add `FaTrash` to the existing import from `react-icons/fa`:
        ```typescript
        import { FaSearch, FaTimes, FaTh, FaList, FaTrash } from 'react-icons/fa';
        ```

2.  **Add Delete Button to UI:**
    *   Inside the `filteredProjects.map((project) => ...)` loop, for both `card` and `list` view modes, add a "Delete" button/icon next to each project.
    *   This button should be visually distinct and placed so it doesn't interfere with the link to the wiki.
    *   The button will call a new function, e.g., `handleDeleteWiki(project)`.

3.  **Implement `handleDeleteWiki` Function:**
    *   Define a new asynchronous function `handleDeleteWiki(project: ProcessedProject)` within the `ProcessedProjects` component.
    *   **Confirmation:** Use `window.confirm()` to ask the user for confirmation:
        ```javascript
        if (!window.confirm(t('confirmDeleteWiki').replace('{name}', project.name).replace('{language}', project.language))) {
          return;
        }
        ```
        *(Requires adding `confirmDeleteWiki: 'Are you sure you want to remove the wiki "{name} ({language})"? This action cannot be undone.'` to `defaultMessages` and corresponding translations.)*
    *   **API Call:** If confirmed, make a `DELETE` request to the backend:
        ```typescript
        try {
          const response = await fetch(`/api/wiki_cache?owner=${project.owner}&repo=${project.repo}&repo_type=${project.repo_type}&language=${project.language}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `Failed to delete wiki: ${response.statusText}`);
          }
          // UI Update on Success
          setProjects(prevProjects => prevProjects.filter(p => !(p.owner === project.owner && p.repo === project.repo && p.repo_type === project.repo_type && p.language === project.language)));
          // Optionally, show a success toast/notification
          alert(t('deleteSuccess').replace('{name}', project.name)); // Placeholder for a better notification system
        } catch (err: any) {
          console.error("Error deleting wiki:", err);
          // Optionally, show an error toast/notification
          alert(t('deleteError') + `: ${err.message}`); // Placeholder
        }
        ```
        *(Requires adding `deleteSuccess: 'Wiki "{name}" removed successfully.'` and `deleteError: 'Error removing wiki'` to `defaultMessages` and translations.)*
    *   **UI Update:** On successful deletion, update the `projects` state to remove the deleted project. This will re-render the list.

### B. `src/app/[owner]/[repo]/page.tsx` (Individual Wiki Page)

1.  **Expose Existing Delete Functionality:**
    *   This file already contains a `deleteCacheFromServer` function that calls `DELETE /api/wiki_cache`.
    *   **Add a "Delete This Wiki" Button:** Add a button to the UI of this page (e.g., in a settings area or near the wiki title).
    *   This button should call `deleteCacheFromServer()`.
    *   **Redirection:** Upon successful deletion, redirect the user. Import `useRouter` from `next/navigation`.
        ```typescript
        import { useRouter } from 'next/navigation';
        // ...
        const router = useRouter();
        // ...
        // Inside deleteCacheFromServer, on success:
        // alert('Wiki cache deleted successfully.'); // Or a better notification
        // router.push('/'); // Redirect to homepage or project list
        ```

## Phase 3: Styling and User Experience

*   Ensure the new delete buttons are styled consistently with the application's design.
*   Provide clear visual feedback during the deletion process (e.g., loading state on the button) and after (success/error notifications). A dedicated toast notification system would be better than `alert()`.

## Summary of Changes:

1.  **`ProcessedProjects.tsx`:**
    *   Import `FaTrash`.
    *   Add delete button to project items (card and list views).
    *   Implement `handleDeleteWiki` function with confirmation, API call, and UI update.
    *   Add new translation keys for confirmation and success/error messages.
2.  **`src/app/[owner]/[repo]/page.tsx`:**
    *   Add a "Delete This Wiki" button.
    *   Ensure `deleteCacheFromServer` is called and handles redirection on success.
    *   Import and use `useRouter`.
