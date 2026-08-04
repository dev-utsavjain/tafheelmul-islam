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
export const DONATIONS_TABLE = "donations";
export const CONTACT_TABLE = "contact_messages";
export const OFFLINE_TABLE = "offline_donations";

export type GalleryItem = {
    id: string;
    file_path: string;
    caption: string;
    category: string;
    sort_order: number;
    created_at: string;
    media_type: 'image' | 'video' | 'pdf';
};

export type Donation = {
    id: string;
    name: string;
    phone: string;
    email: string;
    created_at: string;
};

export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
};

export type OfflineDonation = {
    id: string;
    name: string;
    phone: string;
    amount: number;
    purpose: string;
    donation_date: string;
    address: string;
    created_at: string;
};

export const GALLERY_VIDEO_BUCKET = "gallery-videos";
export const PARTNERS_TABLE = "partners";
export const PARTNERS_BUCKET = "partner-photos";

export type Partner = {
    id: string;
    name: string;
    description: string;
    photo_path: string;
    created_at: string;
};

export function getGalleryImageUrl(filePath: string) {
    const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
}

export function getGalleryVideoUrl(filePath: string) {
    const { data } = supabase.storage.from(GALLERY_VIDEO_BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
}

// PDFs live in the same gallery-images bucket as images.
export function getGalleryPdfUrl(filePath: string) {
    const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
}

export function getPartnerPhotoUrl(filePath: string) {
    const { data } = supabase.storage.from(PARTNERS_BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
}
