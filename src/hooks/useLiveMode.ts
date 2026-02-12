import { useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';

const COMMENT_TEMPLATES = [
    'Could we adjust the lighting in the master bedroom?',
    'The kitchen layout looks perfect in this version.',
    'Please review the window placement on the south wall.',
    'Great improvement on the floor plan flow.',
    'Can we explore a different material for the countertop?',
];

const PROJECT_NAMES = [
    'Lakeview Penthouse', 'Manhattan Office Suite', 'Austin Smart Home',
    'Brooklyn Loft Conversion', 'Chicago Townhouse', 'San Diego Beachfront Condo',
];

export function useLiveMode() {
    const liveModeEnabled = useStore((s) => s.liveModeEnabled);
    const addComment = useStore((s) => s.addComment);
    const addNotification = useStore((s) => s.addNotification);
    const projects = useStore((s) => s.projects);
    const versions = useStore((s) => s.versions);

    const generateRandomEvent = useCallback(() => {
        const eventType = Math.floor(Math.random() * 4);
        const now = new Date().toISOString();
        const projectName = PROJECT_NAMES[Math.floor(Math.random() * PROJECT_NAMES.length)];

        switch (eventType) {
            case 0: { // New comment
                const project = projects[Math.floor(Math.random() * Math.min(10, projects.length))];
                const projectVersions = versions.filter(v => v.projectId === project?.id);
                if (project && projectVersions.length > 0) {
                    const version = projectVersions[projectVersions.length - 1];
                    addComment({
                        id: `live-comment-${Date.now()}`,
                        projectId: project.id,
                        versionId: version.id,
                        authorId: 'c1',
                        authorType: 'client',
                        authorName: 'Sarah Mitchell',
                        content: COMMENT_TEMPLATES[Math.floor(Math.random() * COMMENT_TEMPLATES.length)],
                        status: 'open',
                        createdAt: now,
                    });
                    addNotification({
                        id: `live-notif-${Date.now()}`,
                        type: 'comment',
                        title: 'New Comment',
                        message: `Sarah Mitchell commented on ${project.name}.`,
                        read: false,
                        createdAt: now,
                        link: `/projects/${project.id}`,
                    });
                }
                break;
            }
            case 1: { // Approval state change
                addNotification({
                    id: `live-notif-${Date.now()}`,
                    type: 'approval',
                    title: 'Approval Update',
                    message: `${projectName} version has been approved.`,
                    read: false,
                    createdAt: now,
                });
                break;
            }
            case 2: { // New version
                addNotification({
                    id: `live-notif-${Date.now()}`,
                    type: 'version',
                    title: 'New Version Created',
                    message: `A new version was created for ${projectName}.`,
                    read: false,
                    createdAt: now,
                });
                break;
            }
            case 3: { // System notification
                addNotification({
                    id: `live-notif-${Date.now()}`,
                    type: 'system',
                    title: 'System Update',
                    message: 'New export format available: USDZ for AR preview.',
                    read: false,
                    createdAt: now,
                });
                break;
            }
        }
    }, [projects, versions, addComment, addNotification]);

    useEffect(() => {
        if (!liveModeEnabled) return;

        const interval = setInterval(() => {
            generateRandomEvent();
        }, 10000 + Math.random() * 10000);

        return () => clearInterval(interval);
    }, [liveModeEnabled, generateRandomEvent]);
}
