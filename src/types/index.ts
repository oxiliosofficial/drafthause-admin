// ========================================
// Draft Hause LiDAR Admin Panel — Data Models
// ========================================

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'admin';
    avatar?: string;
}

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: 'active' | 'inactive';
    projectCount: number;
    createdAt: string;
    lastActivity: string;
    notes?: string;
    avatar?: string;
}

export interface Designer {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    skills: string[];
    projectsAssigned: number;
    versionsCreated: number;
    lastActivity: string;
    createdAt: string;
    bio?: string;
    avatar?: string;
}

export type ProjectStatus = 'draft' | 'in-progress' | 'needs-review' | 'approved' | 'archived';
export type ProjectType = 'residential' | 'commercial';

export interface ProjectLocation {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    lat?: number;
    lng?: number;
}

export interface Project {
    id: string;
    name: string;
    clientId: string;
    primaryDesignerId: string;
    supportingDesignerIds: string[];
    type: ProjectType;
    status: ProjectStatus;
    rooms: number;
    versions: number;
    location: ProjectLocation;
    description: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
}

export type ApprovalState = 'pending' | 'approved' | 'changes-requested' | 'rejected';

export interface Version {
    id: string;
    projectId: string;
    versionNumber: number;
    createdBy: string;
    createdAt: string;
    notes: string;
    approvalState: ApprovalState;
    approvedBy?: string;
    approvedAt?: string;
    modelUrl?: string;
    floorPlanUrl?: string;
    fileSize: number;
    measurements: Measurement[];
    annotations: Annotation[];
}

export interface Measurement {
    id: string;
    label: string;
    value: string;
    unit: 'ft' | 'm' | 'in';
}

export interface ModelAsset {
    id: string;
    versionId: string;
    type: '3d-model' | '2d-plan' | 'texture' | 'material';
    filename: string;
    fileSize: number;
    format: string;
    url: string;
    createdAt: string;
}

export interface ExportFile {
    id: string;
    projectId: string;
    versionId: string;
    type: 'pdf' | 'jpg' | 'dxf' | 'obj' | 'stl';
    filename: string;
    fileSize: number;
    generatedBy: string;
    createdAt: string;
    url: string;
}

export interface Annotation {
    id: string;
    type: 'wall' | 'door' | 'window' | 'furniture' | 'measurement' | 'note';
    label: string;
    position?: { x: number; y: number; z: number };
    description?: string;
}

export interface Comment {
    id: string;
    projectId: string;
    versionId: string;
    authorId: string;
    authorType: 'admin' | 'designer' | 'client';
    authorName: string;
    content: string;
    status: 'open' | 'resolved';
    coordinate?: { x: number; y: number; z: number };
    parentId?: string;
    createdAt: string;
    resolvedAt?: string;
}

export interface Approval {
    id: string;
    projectId: string;
    versionId: string;
    requestedAt: string;
    status: 'pending' | 'approved' | 'rejected';
    decidedBy?: string;
    decidedAt?: string;
    notes?: string;
}

export interface Notification {
    id: string;
    type: 'comment' | 'approval' | 'version' | 'export' | 'system';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    link?: string;
}

export type ActivityType =
    | 'version-created'
    | 'comment-added'
    | 'approval-changed'
    | 'export-generated'
    | 'project-created'
    | 'client-portal-view'
    | 'designer-assigned'
    | 'status-changed';

export interface ActivityEvent {
    id: string;
    projectId: string;
    type: ActivityType;
    actor: string;
    description: string;
    createdAt: string;
    metadata?: Record<string, string>;
}

export interface ProductItem {
    id: string;
    name: string;
    brand: string;
    sku: string;
    price: number;
    category: string;
    supplier: string;
    leadTime: string;
    dimensions: string;
    sourceUrl?: string;
    imageUrl?: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    productCount: number;
    icon?: string;
    parentId?: string;
}

export interface AIIdeaSet {
    id: string;
    prompt: string;
    roomType: string;
    style: string;
    images: string[];
    createdAt: string;
    savedItems: string[];
}

export interface Settings {
    companyName: string;
    defaultCurrency: string;
    measurementUnit: 'metric' | 'imperial';
    theme: 'light' | 'dark';
    language: string;
    emailNotifications: boolean;
    desktopNotifications: boolean;
    approvalReminders: boolean;
    commentNotifications: boolean;
    defaultExportFormat: string;
    autoSaveInterval: number;
    portalEnabled: boolean;
    clientCommenting: boolean;
}
