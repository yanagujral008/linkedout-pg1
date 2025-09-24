// Mock data for testimonials
const mockTestimonials = [
  {
    _id: "1",
    _createdDate: new Date("2024-01-15"),
    _updatedDate: new Date("2024-01-15"),
    testimonialText:
      "LinkedOut has revolutionized how I create content. The AI understands my voice perfectly and generates posts that truly sound like me!",
    authorName: "Alex Chen",
    authorTitle: "Content Creator",
    authorImage:
      "https://static.wixstatic.com/media/409286_d3bf7cf4d5824f8996dee6732aaed013~mv2.jpg",
    silhouetteId: 1,
    testimonialDate: new Date("2024-01-15"),
  },
  {
    _id: "2",
    _createdDate: new Date("2024-01-20"),
    _updatedDate: new Date("2024-01-20"),
    testimonialText:
      "The community aspect is amazing. I've connected with so many like-minded creators and learned so much from their experiences.",
    authorName: "Sarah Johnson",
    authorTitle: "Marketing Manager",
    authorImage:
      "https://static.wixstatic.com/media/409286_d3bf7cf4d5824f8996dee6732aaed013~mv2.jpg",
    silhouetteId: 2,
    testimonialDate: new Date("2024-01-20"),
  },
  {
    _id: "3",
    _createdDate: new Date("2024-02-01"),
    _updatedDate: new Date("2024-02-01"),
    testimonialText:
      "The AI writing feature is incredible. It saves me hours every week and the quality is consistently high.",
    authorName: "Marcus Williams",
    authorTitle: "Entrepreneur",
    authorImage:
      "https://static.wixstatic.com/media/409286_d3bf7cf4d5824f8996dee6732aaed013~mv2.jpg",
    silhouetteId: 3,
    testimonialDate: new Date("2024-02-01"),
  },
];

// Generic CRUD Service class for mock data collections
export class BaseCrudService {
  // Creates a new item in the collection
  static async create(collectionId, itemData) {
    try {
      const newItem = {
        ...itemData,
        _id: Math.random().toString(36).substr(2, 9),
        _createdDate: new Date(),
        _updatedDate: new Date(),
      };
      return newItem;
    } catch (error) {
      console.error(`Error creating ${collectionId}:`, error);
      throw new Error(error instanceof Error ? error.message : `Failed to create ${collectionId}`);
    }
  }

  // Retrieves all items from the collection
  static async getAll(collectionId) {
    try {
      let items = [];
      if (collectionId === "testimonials") {
        items = mockTestimonials;
      }
      return { items };
    } catch (error) {
      console.error(`Error fetching ${collectionId}s:`, error);
      throw new Error(error instanceof Error ? error.message : `Failed to fetch ${collectionId}s`);
    }
  }

  // Retrieves a single item by ID
  static async getById(collectionId, itemId) {
    try {
      const result = await this.getAll(collectionId);
      const item = result.items.find((item) => item._id === itemId);
      return item || null;
    } catch (error) {
      console.error(`Error fetching ${collectionId} by ID:`, error);
      throw new Error(error instanceof Error ? error.message : `Failed to fetch ${collectionId}`);
    }
  }

  // Updates an existing item
  static async update(collectionId, itemData) {
    try {
      if (!itemData._id) {
        throw new Error(`${collectionId} ID is required for update`);
      }
      const updatedItem = {
        ...itemData,
        _updatedDate: new Date(),
      };
      return updatedItem;
    } catch (error) {
      console.error(`Error updating ${collectionId}:`, error);
      throw new Error(error instanceof Error ? error.message : `Failed to update ${collectionId}`);
    }
  }

  // Deletes an item by ID
  static async delete(collectionId, itemId) {
    try {
      if (!itemId) {
        throw new Error(`${collectionId} ID is required for deletion`);
      }
      const deletedItem = {
        _id: itemId,
        _createdDate: new Date(),
        _updatedDate: new Date(),
      };
      return deletedItem;
    } catch (error) {
      console.error(`Error deleting ${collectionId}:`, error);
      throw new Error(error instanceof Error ? error.message : `Failed to delete ${collectionId}`);
    }
  }
}
