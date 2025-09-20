import { WixDataItem } from ".";

// Mock data for testimonials
const mockTestimonials = [
  {
    _id: "1",
    _createdDate: new Date("2024-01-15"),
    _updatedDate: new Date("2024-01-15"),
    testimonialText: "LinkedOut has revolutionized how I create content. The AI understands my voice perfectly and generates posts that truly sound like me!",
    authorName: "Alex Chen",
    authorTitle: "Content Creator",
    authorImage: "https://static.wixstatic.com/media/409286_d3bf7cf4d5824f8996dee6732aaed013~mv2.jpg",
    silhouetteId: 1,
    testimonialDate: new Date("2024-01-15")
  },
  {
    _id: "2",
    _createdDate: new Date("2024-01-20"),
    _updatedDate: new Date("2024-01-20"),
    testimonialText: "The community aspect is amazing. I've connected with so many like-minded creators and learned so much from their experiences.",
    authorName: "Sarah Johnson",
    authorTitle: "Marketing Manager",
    authorImage: "https://static.wixstatic.com/media/409286_d3bf7cf4d5824f8996dee6732aaed013~mv2.jpg",
    silhouetteId: 2,
    testimonialDate: new Date("2024-01-20")
  },
  {
    _id: "3",
    _createdDate: new Date("2024-02-01"),
    _updatedDate: new Date("2024-02-01"),
    testimonialText: "The AI writing feature is incredible. It saves me hours every week and the quality is consistently high.",
    authorName: "Marcus Williams",
    authorTitle: "Entrepreneur",
    authorImage: "https://static.wixstatic.com/media/409286_d3bf7cf4d5824f8996dee6732aaed013~mv2.jpg",
    silhouetteId: 3,
    testimonialDate: new Date("2024-02-01")
  }
];

/**
 * Generic CRUD Service class for mock data collections
 * Provides type-safe CRUD operations with error handling
 */
export class BaseCrudService {
  /**
   * Creates a new item in the collection
   * @param itemData - Data for the new item
   * @returns Promise<T> - The created item
   */
  static async create<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    try {
      // Mock implementation - just return the item with a generated ID
      const newItem = {
        ...itemData,
        _id: Math.random().toString(36).substr(2, 9),
        _createdDate: new Date(),
        _updatedDate: new Date()
      };
      return newItem as T;
    } catch (error) {
      console.error(`Error creating ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to create ${collectionId}`
      );
    }
  }

  /**
   * Retrieves all items from the collection
   * @returns Promise<items.WixDataResult<T>> - Query result with all items
   */
  static async getAll<T extends WixDataItem>(collectionId: string): Promise<{ items: T[] }> {
    try {
      // Mock implementation - return mock data based on collection
      let items: T[] = [];
      
      if (collectionId === 'testimonials') {
        items = mockTestimonials as T[];
      }
      
      return { items };
    } catch (error) {
      console.error(`Error fetching ${collectionId}s:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to fetch ${collectionId}s`
      );
    }
  }

  /**
   * Retrieves a single item by ID
   * @param itemId - ID of the item to retrieve
   * @returns Promise<T | null> - The item or null if not found
   */
  static async getById<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T | null> {
    try {
      const result = await this.getAll<T>(collectionId);
      const item = result.items.find(item => item._id === itemId);
      return item || null;
    } catch (error) {
      console.error(`Error fetching ${collectionId} by ID:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to fetch ${collectionId}`
      );
    }
  }

  /**
   * Updates an existing item
   * @param itemData - Updated item data (must include _id)
   * @returns Promise<T> - The updated item
   */
  static async update<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    try {
      if (!itemData._id) {
        throw new Error(`${collectionId} ID is required for update`);
      }

      // Mock implementation - just return the updated item
      const updatedItem = {
        ...itemData,
        _updatedDate: new Date()
      };
      return updatedItem as T;
    } catch (error) {
      console.error(`Error updating ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to update ${collectionId}`
      );
    }
  }

  /**
   * Deletes an item by ID
   * @param itemId - ID of the item to delete
   * @returns Promise<T> - The deleted item
   */
  static async delete<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T> {
    try {
      if (!itemId) {
        throw new Error(`${collectionId} ID is required for deletion`);
      }

      // Mock implementation - just return a mock deleted item
      const deletedItem = {
        _id: itemId,
        _createdDate: new Date(),
        _updatedDate: new Date()
      } as T;
      return deletedItem;
    } catch (error) {
      console.error(`Error deleting ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to delete ${collectionId}`
      );
    }
  }
}
