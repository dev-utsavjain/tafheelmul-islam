import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const GALLERY_SCHEMA = "tafheemul";
export const GALLERY_TABLE = "gallery_items";
export const GALLERY_BUCKET = "gallery-images";

export type GalleryItem = {
    id: string;
    file_path: string;
    caption: string;
    category: string;
    sort_order: number;
    created_at: string;
};

export function getGalleryImageUrl(filePath: string) {
    const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
}