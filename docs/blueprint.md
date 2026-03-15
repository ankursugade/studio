# **App Name**: QS Flow

## Core Features:

- User Authentication (Predefined Avatars): Simplified login for team members via clickable avatars, utilizing Firebase Authentication.
- Real-time Dashboard Overview: A global dashboard displaying real-time aggregated project statistics and a live feed of recent revision activities, fetched from Firestore.
- Personalized Project List: A tabular view showing projects specifically assigned to the currently authenticated user, with real-time updates from Firestore.
- Kanban Workflow Board: An interactive Kanban board representing the six MEP QS workflow stages, with project cards displaying key information like title, client, and assigned user.
- Drag-and-Drop Stage Updates: Enable seamless movement of project cards between Kanban stages via a drag-and-drop interface, updating the project's 'currentStage' field in Firestore in real-time.
- Revision History Logging with Conditional Prompt: Automatically log forward stage changes. For backward moves, a mandatory modal prompts for a 'Reason for Revision', triggering a Firestore batch write to update the stage and record the revision in a sub-collection.
- AI-Powered Revision Reason Suggester Tool: An AI tool that suggests common revision reasons within the 'Reason for Revision' modal based on the specific stage transition and project context, aiding users in quickly articulating issues.

## Style Guidelines:

- The chosen color scheme is light, evoking a sense of professionalism, clarity, and organization, ideal for a data-centric project management application.
- Primary color: . This color instills trust and reflects the engineering precision central to Quantity Surveying.
- Background color: . This subtle background minimizes visual clutter, ensuring focus remains on project data and workflow, while maintaining a cohesive look with the primary color.
- Accent color: . This color is strategically used for interactive elements and highlights, providing excellent contrast and guiding user attention towards actionable items or status changes, such as recent revisions or drag-and-drop interactions.
- All text will use 'Inter', a modern grotesque sans-serif. Its objective and machined appearance aligns with the precision and data-driven nature of MEP Quantity Surveying, ensuring high readability across headlines and detailed project information.
- Use a set of crisp, modern line-art icons that clearly represent common project management concepts, stages, and user actions (e.g., project, client, revision, assigned user, dashboard, list).
- Employ a clean and structured layout with ample whitespace to enhance readability and data digestibility, particularly for the dashboard, project lists, and Kanban board. Ensure intuitive visual hierarchy on project cards and modals.
- Incorporate subtle, functional animations for drag-and-drop operations, real-time data updates, and modal transitions, providing clear visual feedback without distracting the user.
- Background: White or Soft Cream (#F2F0EA).
- Sidebar/Header: Very Dark Gray or Black (#000000).
- Action/CTA: Bright Red or Coral (#FF4D6B).
- Secondary/Data: Soft Blue (#A8D5E3).