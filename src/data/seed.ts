// ========================================
// Draft Hause — Seed Dummy Data
// 12 Clients, 10 Designers, 25 Projects, Versions, Comments, etc.
// ========================================

import {
    Client, Designer, Project, Version, Comment, Approval,
    Notification, ActivityEvent, ExportFile, ProductItem,
    ProductCategory, AIIdeaSet, Settings
} from '../types';

// ===== CLIENTS (12) =====
export const seedClients: Client[] = [
    { id: 'c1', name: 'Sarah Mitchell', email: 'sarah@mitchell-interiors.com', phone: '+1-555-0101', company: 'Mitchell Interiors', status: 'active', projectCount: 4, createdAt: '2025-03-15', lastActivity: '2026-02-10', avatar: 'SM' },
    { id: 'c2', name: 'James Thornton', email: 'james@thornton-dev.com', phone: '+1-555-0102', company: 'Thornton Development', status: 'active', projectCount: 3, createdAt: '2025-04-20', lastActivity: '2026-02-09', avatar: 'JT' },
    { id: 'c3', name: 'Elena Rodriguez', email: 'elena@casa-moderna.com', phone: '+1-555-0103', company: 'Casa Moderna', status: 'active', projectCount: 3, createdAt: '2025-05-10', lastActivity: '2026-02-08', avatar: 'ER' },
    { id: 'c4', name: 'David Chen', email: 'david@chenarchitects.com', phone: '+1-555-0104', company: 'Chen Architects', status: 'active', projectCount: 2, createdAt: '2025-06-01', lastActivity: '2026-02-07', avatar: 'DC' },
    { id: 'c5', name: 'Priya Sharma', email: 'priya@luxe-spaces.com', phone: '+1-555-0105', company: 'Luxe Spaces', status: 'active', projectCount: 3, createdAt: '2025-06-15', lastActivity: '2026-02-06', avatar: 'PS' },
    { id: 'c6', name: 'Marcus Williams', email: 'marcus@urban-loft.com', phone: '+1-555-0106', company: 'Urban Loft Co', status: 'active', projectCount: 2, createdAt: '2025-07-01', lastActivity: '2026-02-05', avatar: 'MW' },
    { id: 'c7', name: 'Olivia Parker', email: 'olivia@parker-homes.com', phone: '+1-555-0107', company: 'Parker Homes', status: 'active', projectCount: 2, createdAt: '2025-07-20', lastActivity: '2026-02-04', avatar: 'OP' },
    { id: 'c8', name: 'Robert Kim', email: 'robert@eliteprops.com', phone: '+1-555-0108', company: 'Elite Properties', status: 'inactive', projectCount: 1, createdAt: '2025-08-05', lastActivity: '2026-01-15', avatar: 'RK' },
    { id: 'c9', name: 'Nadia Al-Rashid', email: 'nadia@arabesque-design.com', phone: '+1-555-0109', company: 'Arabesque Design', status: 'active', projectCount: 2, createdAt: '2025-08-20', lastActivity: '2026-02-03', avatar: 'NA' },
    { id: 'c10', name: 'Thomas Baker', email: 'thomas@bakergroup.com', phone: '+1-555-0110', company: 'Baker Group', status: 'active', projectCount: 1, createdAt: '2025-09-01', lastActivity: '2026-02-01', avatar: 'TB' },
    { id: 'c11', name: 'Isabella Costa', email: 'isabella@costastudio.com', phone: '+1-555-0111', company: 'Costa Studio', status: 'inactive', projectCount: 1, createdAt: '2025-09-15', lastActivity: '2025-12-20', avatar: 'IC' },
    { id: 'c12', name: 'Andrew Foster', email: 'andrew@foster-build.com', phone: '+1-555-0112', company: 'Foster Build LLC', status: 'active', projectCount: 1, createdAt: '2025-10-01', lastActivity: '2026-02-11', avatar: 'AF' },
];

// ===== DESIGNERS (10) =====
export const seedDesigners: Designer[] = [
    { id: 'd1', name: 'Alex Rivera', email: 'alex@drafthause.com', phone: '+1-555-0201', status: 'active', skills: ['3D Modeling', 'Interior Design', 'LiDAR Scanning'], projectsAssigned: 6, versionsCreated: 18, lastActivity: '2026-02-11', createdAt: '2025-01-10', bio: 'Senior spatial designer with 8 years of experience in residential and commercial projects.' },
    { id: 'd2', name: 'Maya Johnson', email: 'maya@drafthause.com', phone: '+1-555-0202', status: 'active', skills: ['Floor Planning', 'Interior Design', 'Color Theory'], projectsAssigned: 5, versionsCreated: 14, lastActivity: '2026-02-10', createdAt: '2025-02-15', bio: 'Specializes in modern residential spaces and sustainable design.' },
    { id: 'd3', name: 'Ryan O\'Brien', email: 'ryan@drafthause.com', phone: '+1-555-0203', status: 'active', skills: ['3D Modeling', 'Commercial Spaces', 'CAD'], projectsAssigned: 4, versionsCreated: 11, lastActivity: '2026-02-09', createdAt: '2025-03-01', bio: 'Expert in commercial space optimization using LiDAR technology.' },
    { id: 'd4', name: 'Sofia Nguyen', email: 'sofia@drafthause.com', phone: '+1-555-0204', status: 'active', skills: ['Interior Design', 'Furniture Layout', 'Lighting'], projectsAssigned: 4, versionsCreated: 12, lastActivity: '2026-02-08', createdAt: '2025-03-20', bio: 'Creative designer focused on luxury residential interiors.' },
    { id: 'd5', name: 'Daniel Kim', email: 'daniel@drafthause.com', phone: '+1-555-0205', status: 'active', skills: ['3D Scanning', 'Measurement', 'Technical Drawing'], projectsAssigned: 3, versionsCreated: 9, lastActivity: '2026-02-07', createdAt: '2025-04-10', bio: 'Technical specialist in LiDAR scanning and precision measurements.' },
    { id: 'd6', name: 'Emma Watson', email: 'emma@drafthause.com', phone: '+1-555-0206', status: 'active', skills: ['Space Planning', 'Material Selection', 'Visualization'], projectsAssigned: 3, versionsCreated: 8, lastActivity: '2026-02-06', createdAt: '2025-05-01', bio: 'Experienced in both residential and commercial renovation projects.' },
    { id: 'd7', name: 'Hassan Ahmed', email: 'hassan@drafthause.com', phone: '+1-555-0207', status: 'active', skills: ['3D Modeling', 'Rendering', 'Animation'], projectsAssigned: 2, versionsCreated: 6, lastActivity: '2026-02-05', createdAt: '2025-06-01', bio: 'Specialist in photorealistic 3D visualizations.' },
    { id: 'd8', name: 'Chloe Martin', email: 'chloe@drafthause.com', phone: '+1-555-0208', status: 'active', skills: ['Interior Design', 'Staging', 'Color Consulting'], projectsAssigned: 2, versionsCreated: 5, lastActivity: '2026-02-03', createdAt: '2025-07-15', bio: 'Home staging expert with an eye for contemporary aesthetics.' },
    { id: 'd9', name: 'Lucas Brown', email: 'lucas@drafthause.com', phone: '+1-555-0209', status: 'inactive', skills: ['CAD', 'Drafting', 'Blueprint'], projectsAssigned: 1, versionsCreated: 3, lastActivity: '2025-12-10', createdAt: '2025-08-01', bio: 'Technical drafter specializing in detailed floor plans.' },
    { id: 'd10', name: 'Amara Okafor', email: 'amara@drafthause.com', phone: '+1-555-0210', status: 'active', skills: ['3D Modeling', 'Interior Design', 'Sustainability'], projectsAssigned: 2, versionsCreated: 4, lastActivity: '2026-02-01', createdAt: '2025-09-01', bio: 'Designer passionate about sustainable and eco-friendly spaces.' },
];

// ===== PROJECTS (25) =====
export const seedProjects: Project[] = [
    { id: 'p1', name: 'Lakeview Penthouse', clientId: 'c1', primaryDesignerId: 'd1', supportingDesignerIds: ['d4'], type: 'residential', status: 'in-progress', rooms: 8, versions: 5, location: { address: '1200 Lake Shore Dr', city: 'Chicago', state: 'IL', zip: '60610', country: 'US' }, description: 'Luxury penthouse redesign with panoramic lake views.', createdAt: '2025-06-10', updatedAt: '2026-02-10', tags: ['luxury', 'penthouse', 'modern'] },
    { id: 'p2', name: 'Manhattan Office Suite', clientId: 'c2', primaryDesignerId: 'd3', supportingDesignerIds: ['d5'], type: 'commercial', status: 'needs-review', rooms: 12, versions: 4, location: { address: '350 5th Ave', city: 'New York', state: 'NY', zip: '10118', country: 'US' }, description: 'Modern corporate office redesign for a tech company.', createdAt: '2025-07-01', updatedAt: '2026-02-09', tags: ['office', 'corporate', 'tech'] },
    { id: 'p3', name: 'Malibu Beach House', clientId: 'c3', primaryDesignerId: 'd2', supportingDesignerIds: [], type: 'residential', status: 'approved', rooms: 6, versions: 7, location: { address: '27000 Pacific Coast Hwy', city: 'Malibu', state: 'CA', zip: '90265', country: 'US' }, description: 'Coastal home renovation with open floor plan.', createdAt: '2025-05-15', updatedAt: '2026-02-08', tags: ['beach', 'coastal', 'renovation'] },
    { id: 'p4', name: 'SoHo Boutique Hotel', clientId: 'c2', primaryDesignerId: 'd1', supportingDesignerIds: ['d7'], type: 'commercial', status: 'in-progress', rooms: 24, versions: 3, location: { address: '200 Spring St', city: 'New York', state: 'NY', zip: '10012', country: 'US' }, description: 'Boutique hotel interior design with artisan touches.', createdAt: '2025-08-20', updatedAt: '2026-02-07', tags: ['hotel', 'boutique', 'artisan'] },
    { id: 'p5', name: 'Austin Smart Home', clientId: 'c4', primaryDesignerId: 'd4', supportingDesignerIds: ['d5'], type: 'residential', status: 'in-progress', rooms: 5, versions: 4, location: { address: '1500 S Congress Ave', city: 'Austin', state: 'TX', zip: '78704', country: 'US' }, description: 'Smart home integration with modern design.', createdAt: '2025-09-01', updatedAt: '2026-02-06', tags: ['smart-home', 'modern', 'tech'] },
    { id: 'p6', name: 'Napa Valley Tasting Room', clientId: 'c5', primaryDesignerId: 'd6', supportingDesignerIds: [], type: 'commercial', status: 'approved', rooms: 4, versions: 6, location: { address: '1111 Dunaweal Ln', city: 'Calistoga', state: 'CA', zip: '94515', country: 'US' }, description: 'Elegant wine tasting room with rustic elements.', createdAt: '2025-07-15', updatedAt: '2026-02-05', tags: ['wine', 'rustic', 'hospitality'] },
    { id: 'p7', name: 'Brooklyn Loft Conversion', clientId: 'c6', primaryDesignerId: 'd2', supportingDesignerIds: ['d8'], type: 'residential', status: 'needs-review', rooms: 3, versions: 5, location: { address: '45 Main St', city: 'Brooklyn', state: 'NY', zip: '11201', country: 'US' }, description: 'Industrial loft conversion to modern living space.', createdAt: '2025-08-01', updatedAt: '2026-02-04', tags: ['loft', 'industrial', 'conversion'] },
    { id: 'p8', name: 'Miami Art Gallery', clientId: 'c5', primaryDesignerId: 'd7', supportingDesignerIds: ['d1'], type: 'commercial', status: 'in-progress', rooms: 6, versions: 3, location: { address: '2100 Collins Ave', city: 'Miami Beach', state: 'FL', zip: '33139', country: 'US' }, description: 'Contemporary art gallery space design.', createdAt: '2025-09-15', updatedAt: '2026-02-03', tags: ['gallery', 'art', 'contemporary'] },
    { id: 'p9', name: 'Denver Mountain Retreat', clientId: 'c7', primaryDesignerId: 'd4', supportingDesignerIds: [], type: 'residential', status: 'draft', rooms: 7, versions: 2, location: { address: '500 Peak View Dr', city: 'Aspen', state: 'CO', zip: '81611', country: 'US' }, description: 'Mountain retreat with natural materials and views.', createdAt: '2025-10-01', updatedAt: '2026-02-02', tags: ['mountain', 'retreat', 'natural'] },
    { id: 'p10', name: 'Seattle Co-Working Hub', clientId: 'c4', primaryDesignerId: 'd3', supportingDesignerIds: ['d6'], type: 'commercial', status: 'in-progress', rooms: 15, versions: 4, location: { address: '1000 2nd Ave', city: 'Seattle', state: 'WA', zip: '98104', country: 'US' }, description: 'Flexible co-working space with collaboration zones.', createdAt: '2025-08-10', updatedAt: '2026-02-01', tags: ['coworking', 'flexible', 'collaborative'] },
    { id: 'p11', name: 'Beverly Hills Villa', clientId: 'c1', primaryDesignerId: 'd1', supportingDesignerIds: ['d4', 'd8'], type: 'residential', status: 'approved', rooms: 10, versions: 8, location: { address: '900 N Bedford Dr', city: 'Beverly Hills', state: 'CA', zip: '90210', country: 'US' }, description: 'Luxury villa complete interior redesign.', createdAt: '2025-04-01', updatedAt: '2026-01-28', tags: ['luxury', 'villa', 'complete'] },
    { id: 'p12', name: 'Portland Coffee Roastery', clientId: 'c3', primaryDesignerId: 'd6', supportingDesignerIds: [], type: 'commercial', status: 'needs-review', rooms: 3, versions: 4, location: { address: '555 NW 13th Ave', city: 'Portland', state: 'OR', zip: '97209', country: 'US' }, description: 'Artisan coffee roastery with tasting bar.', createdAt: '2025-09-20', updatedAt: '2026-01-25', tags: ['coffee', 'artisan', 'hospitality'] },
    { id: 'p13', name: 'SF Tech Startup Office', clientId: 'c9', primaryDesignerId: 'd3', supportingDesignerIds: ['d5'], type: 'commercial', status: 'in-progress', rooms: 8, versions: 3, location: { address: '88 Colin P Kelly Jr St', city: 'San Francisco', state: 'CA', zip: '94107', country: 'US' }, description: 'Open-plan tech startup with collaborative spaces.', createdAt: '2025-10-10', updatedAt: '2026-01-20', tags: ['startup', 'tech', 'open-plan'] },
    { id: 'p14', name: 'Charleston Heritage Home', clientId: 'c7', primaryDesignerId: 'd2', supportingDesignerIds: [], type: 'residential', status: 'approved', rooms: 6, versions: 5, location: { address: '12 Church St', city: 'Charleston', state: 'SC', zip: '29401', country: 'US' }, description: 'Heritage home restoration with modern amenities.', createdAt: '2025-06-20', updatedAt: '2026-01-15', tags: ['heritage', 'restoration', 'classic'] },
    { id: 'p15', name: 'Scottsdale Spa Resort', clientId: 'c5', primaryDesignerId: 'd7', supportingDesignerIds: ['d4'], type: 'commercial', status: 'draft', rooms: 18, versions: 2, location: { address: '7575 E Princess Dr', city: 'Scottsdale', state: 'AZ', zip: '85255', country: 'US' }, description: 'Desert spa resort with wellness-focused design.', createdAt: '2025-11-01', updatedAt: '2026-01-10', tags: ['spa', 'resort', 'wellness'] },
    { id: 'p16', name: 'Chicago Townhouse', clientId: 'c1', primaryDesignerId: 'd4', supportingDesignerIds: [], type: 'residential', status: 'in-progress', rooms: 4, versions: 3, location: { address: '2400 N Lincoln Ave', city: 'Chicago', state: 'IL', zip: '60614', country: 'US' }, description: 'Urban townhouse with contemporary finishes.', createdAt: '2025-10-15', updatedAt: '2026-02-11', tags: ['townhouse', 'urban', 'contemporary'] },
    { id: 'p17', name: 'Nashville Recording Studio', clientId: 'c6', primaryDesignerId: 'd5', supportingDesignerIds: ['d7'], type: 'commercial', status: 'needs-review', rooms: 5, versions: 4, location: { address: '1600 Music Row', city: 'Nashville', state: 'TN', zip: '37203', country: 'US' }, description: 'Professional recording studio with acoustic design.', createdAt: '2025-09-05', updatedAt: '2026-01-30', tags: ['studio', 'acoustic', 'music'] },
    { id: 'p18', name: 'Savannah B&B', clientId: 'c10', primaryDesignerId: 'd8', supportingDesignerIds: [], type: 'commercial', status: 'in-progress', rooms: 8, versions: 3, location: { address: '330 Drayton St', city: 'Savannah', state: 'GA', zip: '31401', country: 'US' }, description: 'Charming bed & breakfast with Southern elegance.', createdAt: '2025-11-10', updatedAt: '2026-01-28', tags: ['bb', 'southern', 'charming'] },
    { id: 'p19', name: 'LA Modern Apartment', clientId: 'c3', primaryDesignerId: 'd1', supportingDesignerIds: [], type: 'residential', status: 'approved', rooms: 3, versions: 6, location: { address: '221 S Grand Ave', city: 'Los Angeles', state: 'CA', zip: '90012', country: 'US' }, description: 'Minimalist apartment design with city views.', createdAt: '2025-05-20', updatedAt: '2026-01-22', tags: ['apartment', 'minimalist', 'modern'] },
    { id: 'p20', name: 'Boston Law Firm', clientId: 'c9', primaryDesignerId: 'd3', supportingDesignerIds: ['d6'], type: 'commercial', status: 'draft', rooms: 10, versions: 2, location: { address: '60 State St', city: 'Boston', state: 'MA', zip: '02109', country: 'US' }, description: 'Prestigious law firm office with traditional elements.', createdAt: '2025-11-20', updatedAt: '2026-01-18', tags: ['law', 'traditional', 'prestigious'] },
    { id: 'p21', name: 'Hamptons Summer House', clientId: 'c1', primaryDesignerId: 'd2', supportingDesignerIds: ['d8'], type: 'residential', status: 'in-progress', rooms: 7, versions: 4, location: { address: '100 Further Ln', city: 'East Hampton', state: 'NY', zip: '11937', country: 'US' }, description: 'Coastal summer house with relaxed luxury.', createdAt: '2025-09-25', updatedAt: '2026-02-10', tags: ['coastal', 'summer', 'luxury'] },
    { id: 'p22', name: 'Phoenix Restaurant', clientId: 'c8', primaryDesignerId: 'd7', supportingDesignerIds: [], type: 'commercial', status: 'archived', rooms: 4, versions: 5, location: { address: '3118 E Camelback Rd', city: 'Phoenix', state: 'AZ', zip: '85016', country: 'US' }, description: 'Fine dining restaurant with desert-inspired interiors.', createdAt: '2025-04-15', updatedAt: '2025-12-01', tags: ['restaurant', 'fine-dining', 'desert'] },
    { id: 'p23', name: 'DC Embassy Residence', clientId: 'c11', primaryDesignerId: 'd1', supportingDesignerIds: ['d4', 'd6'], type: 'residential', status: 'archived', rooms: 12, versions: 6, location: { address: '2800 Woodland Dr NW', city: 'Washington', state: 'DC', zip: '20008', country: 'US' }, description: 'Diplomatic residence with formal and informal spaces.', createdAt: '2025-03-01', updatedAt: '2025-11-15', tags: ['embassy', 'formal', 'diplomatic'] },
    { id: 'p24', name: 'San Diego Beachfront Condo', clientId: 'c12', primaryDesignerId: 'd10', supportingDesignerIds: [], type: 'residential', status: 'in-progress', rooms: 4, versions: 3, location: { address: '1500 Orange Ave', city: 'Coronado', state: 'CA', zip: '92118', country: 'US' }, description: 'Beachfront condo with sustainable materials.', createdAt: '2025-12-01', updatedAt: '2026-02-11', tags: ['beach', 'sustainable', 'condo'] },
    { id: 'p25', name: 'Atlanta Medical Clinic', clientId: 'c2', primaryDesignerId: 'd10', supportingDesignerIds: ['d5'], type: 'commercial', status: 'draft', rooms: 9, versions: 2, location: { address: '550 Peachtree St NE', city: 'Atlanta', state: 'GA', zip: '30308', country: 'US' }, description: 'Modern medical clinic with patient-centric design.', createdAt: '2025-12-15', updatedAt: '2026-02-01', tags: ['medical', 'clinic', 'healthcare'] },
];

// ===== VERSIONS =====
function generateVersions(): Version[] {
    const versions: Version[] = [];
    const approvalStates: ('pending' | 'approved' | 'changes-requested')[] = ['pending', 'approved', 'changes-requested'];

    seedProjects.forEach(project => {
        const count = project.versions;
        for (let i = 1; i <= count; i++) {
            const isLatest = i === count;
            const state = isLatest ?
                (project.status === 'approved' ? 'approved' : project.status === 'needs-review' ? 'pending' : 'pending') :
                (i < count - 1 ? 'approved' : approvalStates[Math.floor(Math.random() * 2)]);

            const monthOffset = Math.floor((count - i) * 1.5);
            const date = new Date(2026, 1, 10);
            date.setMonth(date.getMonth() - monthOffset);

            versions.push({
                id: `v-${project.id}-${i}`,
                projectId: project.id,
                versionNumber: i,
                createdBy: project.primaryDesignerId,
                createdAt: date.toISOString().split('T')[0],
                notes: `Version ${i} ${i === 1 ? '– Initial scan and floor plan' : i === count ? '– Latest revision with client feedback incorporated' : `– Revision ${i} with updated measurements`}`,
                approvalState: state,
                ...(state === 'approved' ? { approvedBy: 'admin', approvedAt: date.toISOString().split('T')[0] } : {}),
                fileSize: Math.floor(Math.random() * 50000) + 2000,
                measurements: [
                    { id: `m-${project.id}-${i}-1`, label: 'Living Room', value: `${14 + Math.floor(Math.random() * 6)}`, unit: 'ft' },
                    { id: `m-${project.id}-${i}-2`, label: 'Kitchen', value: `${10 + Math.floor(Math.random() * 4)}`, unit: 'ft' },
                    { id: `m-${project.id}-${i}-3`, label: 'Master Bedroom', value: `${12 + Math.floor(Math.random() * 5)}`, unit: 'ft' },
                    { id: `m-${project.id}-${i}-4`, label: 'Ceiling Height', value: `${9 + Math.floor(Math.random() * 3)}`, unit: 'ft' },
                ],
                annotations: [
                    { id: `a-${project.id}-${i}-1`, type: 'wall', label: 'Load-bearing Wall', position: { x: 2, y: 0, z: 3 } },
                    { id: `a-${project.id}-${i}-2`, type: 'door', label: 'Main Entry', position: { x: 0, y: 0, z: 5 } },
                    { id: `a-${project.id}-${i}-3`, type: 'window', label: 'Bay Window', position: { x: 4, y: 1.5, z: 0 }, description: 'Large bay window facing south' },
                    { id: `a-${project.id}-${i}-4`, type: 'furniture', label: 'Kitchen Island', position: { x: 3, y: 0, z: 4 } },
                ],
            });
        }
    });
    return versions;
}

export const seedVersions = generateVersions();

// ===== COMMENTS (120+) =====
function generateComments(): Comment[] {
    const comments: Comment[] = [];
    const commentTemplates = [
        'The layout looks great, but can we adjust the kitchen counter placement?',
        'I love the natural lighting in this version. Very well done!',
        'The measurements seem off for the master bedroom. Please verify.',
        'Can we explore darker wood tones for the flooring?',
        'The window placement creates excellent cross-ventilation.',
        'Client requested a larger walk-in closet in the master suite.',
        'The 3D scan shows some discrepancies near the north wall.',
        'Great progress on the open floor plan concept.',
        'Need to reconsider the furniture arrangement in the living room.',
        'The color palette in this version is much more cohesive.',
        'Can we add more storage solutions in the hallway?',
        'The ceiling height allows for a stunning chandelier installation.',
        'Please update the annotations for the new door location.',
        'The commercial space needs better traffic flow patterns.',
        'Excellent use of the corner space for the reading nook.',
        'The materials selected align well with the sustainability goals.',
        'Consider adding an accent wall in the dining area.',
        'The LiDAR scan quality is exceptional for this room.',
        'Client is very happy with the window treatment suggestions.',
        'We need to address the HVAC duct routing in the floor plan.',
        'The lighting design creates a wonderful ambiance.',
        'Can we get a section cut showing the mezzanine level?',
        'The bathroom layout needs to comply with ADA requirements.',
        'Love the integration of smart home features into the design.',
        'The entryway redesign makes a much stronger first impression.',
    ];

    const authorOptions = [
        { id: 'admin', type: 'admin' as const, name: 'Admin' },
        ...seedDesigners.slice(0, 5).map(d => ({ id: d.id, type: 'designer' as const, name: d.name })),
        ...seedClients.slice(0, 5).map(c => ({ id: c.id, type: 'client' as const, name: c.name })),
    ];

    let commentId = 1;
    seedProjects.forEach(project => {
        const projectVersions = seedVersions.filter(v => v.projectId === project.id);
        projectVersions.forEach(version => {
            const numComments = 2 + Math.floor(Math.random() * 4);
            for (let i = 0; i < numComments; i++) {
                const author = authorOptions[Math.floor(Math.random() * authorOptions.length)];
                const isResolved = Math.random() > 0.4;
                const dayOffset = Math.floor(Math.random() * 30);
                const date = new Date(2026, 1, 10);
                date.setDate(date.getDate() - dayOffset);

                comments.push({
                    id: `comment-${commentId++}`,
                    projectId: project.id,
                    versionId: version.id,
                    authorId: author.id,
                    authorType: author.type,
                    authorName: author.name,
                    content: commentTemplates[Math.floor(Math.random() * commentTemplates.length)],
                    status: isResolved ? 'resolved' : 'open',
                    coordinate: Math.random() > 0.6 ? { x: Math.random() * 8, y: Math.random() * 3, z: Math.random() * 8 } : undefined,
                    createdAt: date.toISOString(),
                    ...(isResolved ? { resolvedAt: new Date(date.getTime() + 86400000 * 2).toISOString() } : {}),
                });
            }
        });
    });
    return comments;
}

export const seedComments = generateComments();

// ===== APPROVALS =====
function generateApprovals(): Approval[] {
    return seedVersions
        .filter(v => v.approvalState === 'pending')
        .map(v => {
            const project = seedProjects.find(p => p.id === v.projectId)!;
            return {
                id: `approval-${v.id}`,
                projectId: project.id,
                versionId: v.id,
                requestedAt: v.createdAt,
                status: 'pending' as const,
            };
        });
}

export const seedApprovals = generateApprovals();

// ===== NOTIFICATIONS =====
export const seedNotifications: Notification[] = [
    { id: 'n1', type: 'approval', title: 'Approval Requested', message: 'Version 4 of Manhattan Office Suite is awaiting approval.', read: false, createdAt: '2026-02-11T10:30:00', link: '/projects/p2' },
    { id: 'n2', type: 'comment', title: 'New Comment', message: 'Sarah Mitchell commented on Lakeview Penthouse v5.', read: false, createdAt: '2026-02-11T09:15:00', link: '/projects/p1' },
    { id: 'n3', type: 'version', title: 'New Version Created', message: 'Alex Rivera created version 3 for Chicago Townhouse.', read: false, createdAt: '2026-02-10T16:45:00', link: '/projects/p16' },
    { id: 'n4', type: 'export', title: 'Export Ready', message: 'PDF export for Malibu Beach House v7 is ready for download.', read: true, createdAt: '2026-02-10T14:20:00', link: '/projects/p3' },
    { id: 'n5', type: 'approval', title: 'Version Approved', message: 'Napa Valley Tasting Room v6 has been approved.', read: true, createdAt: '2026-02-09T11:00:00', link: '/projects/p6' },
    { id: 'n6', type: 'comment', title: 'Comment Resolved', message: 'Ryan O\'Brien resolved a comment on Seattle Co-Working Hub.', read: true, createdAt: '2026-02-09T09:30:00', link: '/projects/p10' },
    { id: 'n7', type: 'system', title: 'Storage Alert', message: 'Storage usage has reached 75%. Consider archiving old projects.', read: false, createdAt: '2026-02-08T08:00:00' },
    { id: 'n8', type: 'version', title: 'New Version', message: 'Maya Johnson created version 5 for Brooklyn Loft Conversion.', read: true, createdAt: '2026-02-07T15:30:00', link: '/projects/p7' },
    { id: 'n9', type: 'comment', title: 'New Comment', message: 'David Chen commented on Austin Smart Home v4.', read: true, createdAt: '2026-02-06T12:00:00', link: '/projects/p5' },
    { id: 'n10', type: 'approval', title: 'Changes Requested', message: 'Client requested changes on Nashville Recording Studio v4.', read: false, createdAt: '2026-02-05T17:00:00', link: '/projects/p17' },
];

// ===== ACTIVITY EVENTS =====
function generateActivityEvents(): ActivityEvent[] {
    const events: ActivityEvent[] = [];
    let eventId = 1;

    const templates: { type: ActivityEvent['type']; actors: string[]; descriptions: string[] }[] = [
        { type: 'version-created', actors: ['Alex Rivera', 'Maya Johnson', 'Ryan O\'Brien', 'Sofia Nguyen'], descriptions: ['created version {v} for {p}', 'uploaded new scan data for {p}'] },
        { type: 'comment-added', actors: ['Admin', 'Sarah Mitchell', 'Alex Rivera', 'James Thornton'], descriptions: ['commented on {p} version {v}', 'added feedback on {p}'] },
        { type: 'approval-changed', actors: ['Admin'], descriptions: ['approved version {v} of {p}', 'requested changes on {p} v{v}'] },
        { type: 'export-generated', actors: ['System', 'Admin'], descriptions: ['generated PDF export for {p}', 'created DXF export for {p} v{v}'] },
        { type: 'project-created', actors: ['Admin'], descriptions: ['created project {p}'] },
        { type: 'client-portal-view', actors: ['Sarah Mitchell', 'Elena Rodriguez', 'James Thornton'], descriptions: ['viewed {p} in client portal', 'accessed version {v} via portal'] },
    ];

    for (let i = 0; i < 50; i++) {
        const template = templates[Math.floor(Math.random() * templates.length)];
        const project = seedProjects[Math.floor(Math.random() * seedProjects.length)];
        const version = Math.floor(Math.random() * project.versions) + 1;
        const dayOffset = Math.floor(Math.random() * 30);
        const date = new Date(2026, 1, 11);
        date.setDate(date.getDate() - dayOffset);

        events.push({
            id: `event-${eventId++}`,
            projectId: project.id,
            type: template.type,
            actor: template.actors[Math.floor(Math.random() * template.actors.length)],
            description: template.descriptions[Math.floor(Math.random() * template.descriptions.length)]
                .replace('{p}', project.name)
                .replace('{v}', String(version)),
            createdAt: date.toISOString(),
        });
    }

    return events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const seedActivityEvents = generateActivityEvents();

// ===== EXPORT FILES =====
function generateExportFiles(): ExportFile[] {
    const exports: ExportFile[] = [];
    const formats: ExportFile['type'][] = ['pdf', 'jpg', 'dxf', 'obj', 'stl'];
    let exportId = 1;

    seedProjects.slice(0, 15).forEach(project => {
        const numExports = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numExports; i++) {
            const format = formats[Math.floor(Math.random() * formats.length)];
            const dayOffset = Math.floor(Math.random() * 60);
            const date = new Date(2026, 1, 10);
            date.setDate(date.getDate() - dayOffset);

            exports.push({
                id: `export-${exportId++}`,
                projectId: project.id,
                versionId: `v-${project.id}-${project.versions}`,
                type: format,
                filename: `${project.name.replace(/\s+/g, '_')}_v${project.versions}.${format}`,
                fileSize: Math.floor(Math.random() * 50000) + 500,
                generatedBy: 'System',
                createdAt: date.toISOString().split('T')[0],
                url: '#',
            });
        }
    });
    return exports;
}

export const seedExportFiles = generateExportFiles();

// ===== PRODUCT LIBRARY =====
export const seedProductCategories: ProductCategory[] = [
    { id: 'cat1', name: 'Sofas & Seating', description: 'Living room and lounge seating solutions', productCount: 5 },
    { id: 'cat2', name: 'Tables & Desks', description: 'Dining, coffee, and work tables', productCount: 4 },
    { id: 'cat3', name: 'Lighting', description: 'Ambient, task, and accent lighting', productCount: 4 },
    { id: 'cat4', name: 'Storage', description: 'Shelving, cabinets, and storage solutions', productCount: 3 },
    { id: 'cat5', name: 'Rugs & Textiles', description: 'Floor coverings and fabric accents', productCount: 3 },
    { id: 'cat6', name: 'Accessories', description: 'Decorative objects and accessories', productCount: 3 },
];

export const seedProducts: ProductItem[] = [
    { id: 'prod1', name: 'Aria Modular Sofa', brand: 'Restoration Hardware', sku: 'RH-AMS-001', price: 6350, category: 'Furniture', supplier: 'Restoration Hardware', leadTime: '6-8 weeks', dimensions: '280 x 100 x 75 cm', sourceUrl: 'https://rh.com/aria-modular' },
    { id: 'prod2', name: 'Executive Leather Chair', brand: 'Herman Miller', sku: 'HM-ELC-002', price: 3150, category: 'Furniture', supplier: 'Herman Miller', leadTime: '3-4 weeks', dimensions: '65 x 65 x 110 cm' },
    { id: 'prod3', name: 'Scandinavian Accent Chair', brand: 'Fritz Hansen', sku: 'FH-SAC-003', price: 1500, category: 'Furniture', supplier: 'Fritz Hansen', leadTime: '4-6 weeks', dimensions: '70 x 70 x 80 cm' },
    { id: 'prod4', name: 'Marble Console Table', brand: 'CB2', sku: 'CB2-MCT-004', price: 1850, category: 'Furniture', supplier: 'CB2', leadTime: '2-3 weeks', dimensions: '120 x 35 x 80 cm' },
    { id: 'prod5', name: 'Standing Conference Table', brand: 'Steelcase', sku: 'SC-SCT-005', price: 4000, category: 'Furniture', supplier: 'Steelcase', leadTime: '4-6 weeks', dimensions: '240 x 120 x 110 cm' },
    { id: 'prod6', name: 'Sculptural Pendant Light', brand: 'Flos', sku: 'FL-SPL-006', price: 1100, category: 'Lighting', supplier: 'Flos', leadTime: '3-5 weeks', dimensions: '50 x 50 x 60 cm' },
    { id: 'prod7', name: 'Linear Track Lighting', brand: 'Bega', sku: 'BG-LTL-007', price: 850, category: 'Lighting', supplier: 'Bega', leadTime: '2-4 weeks', dimensions: '120 x 8 x 12 cm' },
    { id: 'prod8', name: 'Walnut Bookshelf System', brand: 'USM', sku: 'USM-WBS-008', price: 4000, category: 'Furniture', supplier: 'USM', leadTime: '6-8 weeks', dimensions: '200 x 40 x 220 cm' },
    { id: 'prod9', name: 'Hand-Knotted Persian Rug', brand: 'Restoration Hardware', sku: 'RH-HPR-009', price: 7500, category: 'Textiles', supplier: 'Restoration Hardware', leadTime: '8-12 weeks', dimensions: '300 x 200 cm' },
    { id: 'prod10', name: 'Commercial Floor Tile', brand: 'Porcelanosa', sku: 'PO-CFT-010', price: 25, category: 'Flooring', supplier: 'Porcelanosa', leadTime: '1-2 weeks', dimensions: '60 x 60 cm' },
    { id: 'prod11', name: 'Ceramic Vase Collection', brand: 'Jonathan Adler', sku: 'JA-CVC-011', price: 400, category: 'Wall Decor', supplier: 'Jonathan Adler', leadTime: '1-2 weeks', dimensions: '15 x 15 x 30 cm' },
    { id: 'prod12', name: 'Brass Wall Sconce', brand: 'Visual Comfort', sku: 'VC-BWS-012', price: 450, category: 'Lighting', supplier: 'Visual Comfort', leadTime: '3-5 weeks', dimensions: '15 x 12 x 25 cm' },
    { id: 'prod13', name: 'Live Edge Dining Table', brand: 'West Elm', sku: 'WE-LDT-013', price: 3500, category: 'Furniture', supplier: 'West Elm', leadTime: '4-6 weeks', dimensions: '200 x 100 x 76 cm' },
    { id: 'prod14', name: 'Velvet Throw Pillow Set', brand: 'West Elm', sku: 'WE-VTP-014', price: 200, category: 'Textiles', supplier: 'West Elm', leadTime: '1 week', dimensions: '50 x 50 cm' },
    { id: 'prod15', name: 'Filing Cabinet System', brand: 'Steelcase', sku: 'SC-FCS-015', price: 1100, category: 'Furniture', supplier: 'Steelcase', leadTime: '2-3 weeks', dimensions: '45 x 60 x 100 cm' },
    { id: 'prod16', name: 'Abstract Wall Art', brand: 'Minted', sku: 'MT-AWA-016', price: 525, category: 'Wall Decor', supplier: 'Minted', leadTime: '1-2 weeks', dimensions: '90 x 120 cm' },
    { id: 'prod17', name: 'Oak Side Table', brand: 'Article', sku: 'AR-OST-017', price: 400, category: 'Furniture', supplier: 'Article', leadTime: '2-3 weeks', dimensions: '45 x 45 x 55 cm' },
    { id: 'prod18', name: 'Lounge Chair', brand: 'Knoll', sku: 'KN-LC-018', price: 4250, category: 'Furniture', supplier: 'Knoll', leadTime: '6-8 weeks', dimensions: '80 x 85 x 80 cm' },
    { id: 'prod19', name: 'Smart LED Panel', brand: 'Philips Hue', sku: 'PH-SLP-019', price: 300, category: 'Lighting', supplier: 'Philips', leadTime: '1 week', dimensions: '60 x 60 x 5 cm' },
    { id: 'prod20', name: 'Entryway Storage Bench', brand: 'Crate & Barrel', sku: 'CB-ESB-020', price: 1150, category: 'Furniture', supplier: 'Crate & Barrel', leadTime: '3-4 weeks', dimensions: '120 x 40 x 50 cm' },
];

// ===== AI IDEA SETS =====
export const seedAIIdeaSets: AIIdeaSet[] = [
    {
        id: 'ai1', prompt: 'Modern Minimalist Living Room - Mid-Range', roomType: 'Living Room', style: 'Modern Minimalist', createdAt: '2026-02-05', savedItems: ['concept-1', 'concept-3'],
        images: ['concept-clean-lines.jpg', 'concept-scandi-warmth.jpg', 'concept-urban-chic.jpg', 'concept-monochrome.jpg'],
    },
    {
        id: 'ai2', prompt: 'Boutique Luxury Hotel Lobby - Premium', roomType: 'Hotel Lobby', style: 'Boutique Luxury', createdAt: '2026-01-28', savedItems: [],
        images: ['concept-grand-entrance.jpg', 'concept-intimate-welcome.jpg', 'concept-art-deco.jpg', 'concept-modern-glam.jpg'],
    },
];

// ===== DEFAULT SETTINGS =====
export const defaultSettings: Settings = {
    companyName: 'Draft Hause',
    defaultCurrency: 'USD',
    measurementUnit: 'metric',
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    desktopNotifications: false,
    approvalReminders: true,
    commentNotifications: true,
    defaultExportFormat: 'pdf',
    autoSaveInterval: 5,
    portalEnabled: true,
    clientCommenting: true,
};
