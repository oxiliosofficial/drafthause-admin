// ========================================
// Fake API — Simulated async operations
// ========================================

const delay = (ms?: number) => new Promise(resolve => setTimeout(resolve, ms || 300 + Math.random() * 300));

export const fakeApi = {
    // Generic CRUD simulation
    async fetch<T>(data: T): Promise<T> {
        await delay();
        return data;
    },

    async create<T>(item: T): Promise<T> {
        await delay(400);
        return item;
    },

    async update<T>(item: T): Promise<T> {
        await delay(350);
        return item;
    },

    async delete(id: string): Promise<{ success: boolean }> {
        await delay(300);
        return { success: true };
    },

    // Simulated file operations
    async generateExport(projectName: string, format: string): Promise<{ url: string; filename: string }> {
        await delay(1500);
        return {
            url: '#',
            filename: `${projectName.replace(/\s+/g, '_')}_export.${format}`,
        };
    },

    // Simulated AI generation — returns array of placeholder image names
    async generateAIIdeas(prompt: string): Promise<string[]> {
        await delay(2000);
        return [
            `ai-concept-${Date.now()}-1.jpg`,
            `ai-concept-${Date.now()}-2.jpg`,
            `ai-concept-${Date.now()}-3.jpg`,
            `ai-concept-${Date.now()}-4.jpg`,
        ];
    },

    // Simulated URL scraping — returns a single product
    async scrapeProductUrl(url: string): Promise<{ name: string; brand: string; sku: string; price: number }> {
        await delay(1800);
        const products = [
            { name: 'Artisan Floor Lamp', brand: 'West Elm', sku: 'WE-AFL-100', price: 450 },
            { name: 'Velvet Accent Chair', brand: 'CB2', sku: 'CB2-VAC-101', price: 899 },
            { name: 'Marble Side Table', brand: 'Article', sku: 'AR-MST-102', price: 349 },
            { name: 'Linen Throw Blanket', brand: 'Crate & Barrel', sku: 'CB-LTB-103', price: 129 },
        ];
        return products[Math.floor(Math.random() * products.length)];
    },

    // Report generation
    async generateReport(reportType: string): Promise<{ url: string; filename: string }> {
        await delay(2000);
        return {
            url: '#',
            filename: `Draft_Hause_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`,
        };
    },
};
