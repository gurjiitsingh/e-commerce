import { category } from '@/db/schema';
import { db } from '@/db'
import { eq } from 'drizzle-orm';

export async  function deleteCategory(id){

    const result = await db.delete(category).where(eq(category.categoryId, id))
    
    }