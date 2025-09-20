/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
    _id: string;
    _createdDate?: Date;
    _updatedDate?: Date;
    /** @wixFieldType text */
    testimonialText?: string;
    /** @wixFieldType text */
    authorName?: string;
    /** @wixFieldType text */
    authorTitle?: string;
    /** @wixFieldType image */
    authorImage?: string;
    /** @wixFieldType number */
    silhouetteId?: number;
    /** @wixFieldType date */
    testimonialDate?: Date | string;
  }
  