// ========================================
// Draft Hause — Zustand Store
// Central state management for all modules
// ========================================

import { create } from 'zustand';
import {
    Client, Designer, Project, Version, Comment, Approval,
    Notification, ActivityEvent, ExportFile, ProductItem,
    ProductCategory, AIIdeaSet, Settings
} from '../types';
import {
    seedClients, seedDesigners, seedProjects, seedVersions,
    seedComments, seedApprovals, seedNotifications, seedActivityEvents,
    seedExportFiles, seedProducts, seedProductCategories, seedAIIdeaSets,
    defaultSettings
} from '../data/seed';

interface AppState {
    // Data
    clients: Client[];
    designers: Designer[];
    projects: Project[];
    versions: Version[];
    comments: Comment[];
    approvals: Approval[];
    notifications: Notification[];
    activityEvents: ActivityEvent[];
    exportFiles: ExportFile[];
    productItems: ProductItem[];
    productCategories: ProductCategory[];
    aiIdeaSets: AIIdeaSet[];
    settings: Settings;

    // UI State
    liveModeEnabled: boolean;
    sidebarCollapsed: boolean;

    // Client Actions
    addClient: (client: Client) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
    deleteClient: (id: string) => void;

    // Designer Actions
    addDesigner: (designer: Designer) => void;
    updateDesigner: (id: string, updates: Partial<Designer>) => void;
    deleteDesigner: (id: string) => void;

    // Project Actions
    addProject: (project: Project) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;

    // Version Actions
    addVersion: (version: Version) => void;
    updateVersion: (id: string, updates: Partial<Version>) => void;

    // Comment Actions
    addComment: (comment: Comment) => void;
    updateComment: (id: string, updates: Partial<Comment>) => void;

    // Approval Actions
    updateApproval: (id: string, updates: Partial<Approval>) => void;

    // Notification Actions
    addNotification: (notification: Notification) => void;
    markNotificationRead: (id: string) => void;
    markAllNotificationsRead: () => void;

    // Activity Actions
    addActivityEvent: (event: ActivityEvent) => void;

    // Product Actions
    addProductItem: (product: ProductItem) => void;
    updateProductItem: (id: string, updates: Partial<ProductItem>) => void;
    deleteProductItem: (id: string) => void;

    // AI Ideas
    addAIIdeaSet: (ideaSet: AIIdeaSet) => void;

    // Settings
    updateSettings: (updates: Partial<Settings>) => void;

    // UI
    toggleLiveMode: () => void;
    toggleSidebar: () => void;
}

// Load settings from localStorage
const loadSettings = (): Settings => {
    try {
        const saved = localStorage.getItem('dh-settings');
        if (saved) return JSON.parse(saved);
    } catch { }
    return defaultSettings;
};

export const useStore = create<AppState>((set) => ({
    // Initialize with seed data
    clients: seedClients,
    designers: seedDesigners,
    projects: seedProjects,
    versions: seedVersions,
    comments: seedComments,
    approvals: seedApprovals,
    notifications: seedNotifications,
    activityEvents: seedActivityEvents,
    exportFiles: seedExportFiles,
    productItems: seedProducts,
    productCategories: seedProductCategories,
    aiIdeaSets: seedAIIdeaSets,
    settings: loadSettings(),

    liveModeEnabled: false,
    sidebarCollapsed: false,

    // Client Actions
    addClient: (client) => set((s) => ({ clients: [...s.clients, client] })),
    updateClient: (id, updates) => set((s) => ({
        clients: s.clients.map(c => c.id === id ? { ...c, ...updates } : c),
    })),
    deleteClient: (id) => set((s) => ({
        clients: s.clients.filter(c => c.id !== id),
    })),

    // Designer Actions
    addDesigner: (designer) => set((s) => ({ designers: [...s.designers, designer] })),
    updateDesigner: (id, updates) => set((s) => ({
        designers: s.designers.map(d => d.id === id ? { ...d, ...updates } : d),
    })),
    deleteDesigner: (id) => set((s) => ({
        designers: s.designers.filter(d => d.id !== id),
    })),

    // Project Actions
    addProject: (project) => set((s) => ({ projects: [...s.projects, project] })),
    updateProject: (id, updates) => set((s) => ({
        projects: s.projects.map(p => p.id === id ? { ...p, ...updates } : p),
    })),
    deleteProject: (id) => set((s) => ({
        projects: s.projects.filter(p => p.id !== id),
    })),

    // Version Actions
    addVersion: (version) => set((s) => ({ versions: [...s.versions, version] })),
    updateVersion: (id, updates) => set((s) => ({
        versions: s.versions.map(v => v.id === id ? { ...v, ...updates } : v),
    })),

    // Comment Actions
    addComment: (comment) => set((s) => ({ comments: [...s.comments, comment] })),
    updateComment: (id, updates) => set((s) => ({
        comments: s.comments.map(c => c.id === id ? { ...c, ...updates } : c),
    })),

    // Approval Actions
    updateApproval: (id, updates) => set((s) => ({
        approvals: s.approvals.map(a => a.id === id ? { ...a, ...updates } : a),
    })),

    // Notification Actions
    addNotification: (notification) => set((s) => ({
        notifications: [notification, ...s.notifications],
    })),
    markNotificationRead: (id) => set((s) => ({
        notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    })),
    markAllNotificationsRead: () => set((s) => ({
        notifications: s.notifications.map(n => ({ ...n, read: true })),
    })),

    // Activity Actions
    addActivityEvent: (event) => set((s) => ({
        activityEvents: [event, ...s.activityEvents],
    })),

    // Product Actions
    addProductItem: (product) => set((s) => ({ productItems: [...s.productItems, product] })),
    updateProductItem: (id, updates) => set((s) => ({
        productItems: s.productItems.map(p => p.id === id ? { ...p, ...updates } : p),
    })),
    deleteProductItem: (id) => set((s) => ({
        productItems: s.productItems.filter(p => p.id !== id),
    })),

    // AI Ideas
    addAIIdeaSet: (ideaSet) => set((s) => ({
        aiIdeaSets: [...s.aiIdeaSets, ideaSet],
    })),

    // Settings
    updateSettings: (updates) => set((s) => {
        const newSettings = { ...s.settings, ...updates };
        localStorage.setItem('dh-settings', JSON.stringify(newSettings));
        return { settings: newSettings };
    }),

    // UI
    toggleLiveMode: () => set((s) => ({ liveModeEnabled: !s.liveModeEnabled })),
    toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
