import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Upload,
    Trash2,
    Image as ImageIcon,
    LogOut,
    Lock,
    CheckCircle,
    AlertCircle,
    X,
    Loader2,
} from "lucide-react";
import {
    supabase,
    type GalleryItem,
    GALLERY_BUCKET,
    GALLERY_SCHEMA,
    GALLERY_TABLE,
    getGalleryImageUrl,
} from "../lib/supabase";

const CATEGORIES = [
    "Awareness",
    "Certification",
    "Community",
    "Education",
    "Environment",
    "Healthcare",
    "Media",
    "Relief",
    "Training",
];

function Toast({
    message,
    type,
    onDismiss,
}: {
    message: string;
    type: "success" | "error";
    onDismiss: () => void;
}) {
    useEffect(() => {
        const t = setTimeout(onDismiss, 4000);
        return () => clearTimeout(t);
    }, [onDismiss]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium ${type === "success" ? "bg-[#0a301d] text-[#bcff5f]" : "bg-red-600 text-white"
                }`}
        >
            {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {message}
            <button onClick={onDismiss} className="ml-2 opacity-70 hover:opacity-100">
                <X size={15} />
            </button>
        </motion.div>
    );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        setSubmitting(false);

        if (error) {
            setError(error.message);
            return;
        }

        onLogin();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm w-full max-w-sm flex flex-col gap-6"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#e8fccd] flex items-center justify-center">
                        <Lock size={24} className="text-[#12372a]" />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-sm text-gray-500 text-center">Gallery Management — Tafheem-ul-Islam Trust</p>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none transition-colors focus:border-[#12372a]"
                            placeholder="admin@example.com"
                            autoFocus
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none transition-colors focus:border-[#12372a]"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-[#12372a] text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export function AdminGalleryPage() {
    const [sessionChecked, setSessionChecked] = useState(false);
    const [authed, setAuthed] = useState(false);
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const [caption, setCaption] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const showToast = (message: string, type: "success" | "error") =>
        setToast({ message, type });

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setAuthed(!!data.session);
            setSessionChecked(true);
        });
    }, []);

    const loadItems = useCallback(async () => {
        setLoading(true);

        const { data, error } = await supabase
            .schema(GALLERY_SCHEMA)
            .from(GALLERY_TABLE)
            .select("*")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Admin gallery load error:", error.message);
            showToast(error.message, "error");
        } else {
            setItems(data || []);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        if (authed) loadItems();
    }, [authed, loadItems]);

    const handleFile = (f: File) => {
        if (!f.type.startsWith("image/")) {
            showToast("Only image files are allowed.", "error");
            return;
        }

        setFile(f);

        const reader = new FileReader();
        reader.onload = (e) => setPreview((e.target?.result as string) || null);
        reader.readAsDataURL(f);

        if (!caption) {
            setCaption(f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handleFile(f);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file || !caption.trim()) {
            showToast("Please select an image and enter a caption.", "error");
            return;
        }

        setUploading(true);

        const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;

        const { error: uploadError } = await supabase.storage
            .from(GALLERY_BUCKET)
            .upload(safeName, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            setUploading(false);
            showToast(uploadError.message, "error");
            return;
        }

        const { error: insertError } = await supabase
            .schema(GALLERY_SCHEMA)
            .from(GALLERY_TABLE)
            .insert({
                file_path: safeName,
                caption: caption.trim(),
                category,
                sort_order: 0,
            });

        if (insertError) {
            await supabase.storage.from(GALLERY_BUCKET).remove([safeName]);
            setUploading(false);
            showToast(insertError.message, "error");
            return;
        }

        setUploading(false);
        setFile(null);
        setPreview(null);
        setCaption("");
        setCategory(CATEGORIES[0]);
        showToast("Image uploaded successfully!", "success");
        loadItems();
    };

    const handleDelete = async (item: GalleryItem) => {
        const confirmed = window.confirm(`Delete "${item.caption}"? This cannot be undone.`);
        if (!confirmed) return;

        const { error: storageError } = await supabase.storage
            .from(GALLERY_BUCKET)
            .remove([item.file_path]);

        if (storageError) {
            showToast(storageError.message, "error");
            return;
        }

        const { error: dbError } = await supabase
            .schema(GALLERY_SCHEMA)
            .from(GALLERY_TABLE)
            .delete()
            .eq("id", item.id);

        if (dbError) {
            showToast(dbError.message, "error");
            return;
        }

        showToast("Image deleted.", "success");
        loadItems();
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setAuthed(false);
    };

    if (!sessionChecked) {
        return <div className="min-h-screen bg-gray-50" />;
    }

    if (!authed) {
        return <LoginScreen onLogin={() => setAuthed(true)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-20 py-4 max-w-screen-xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#e8fccd] flex items-center justify-center">
                            <ImageIcon size={18} className="text-[#12372a]" />
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-gray-900 text-base leading-tight">Gallery Admin</h1>
                            <p className="text-xs text-gray-400">Tafheem-ul-Islam Trust</p>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                    >
                        <LogOut size={16} /> Sign out
                    </button>
                </div>
            </header>

            <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12 flex flex-col gap-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Images", value: items.length },
                        { label: "Categories", value: new Set(items.map((i) => i.category)).size },
                        { label: "Schema", value: "tafheemul" },
                        { label: "Storage", value: "gallery-images" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                                {stat.label}
                            </p>
                            <p className="font-display font-bold text-gray-900 text-xl">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                        <div>
                            <h2 className="font-display text-xl font-bold text-gray-900">Upload Image</h2>
                            <p className="text-sm text-gray-400 mt-1">
                                Uploaded to bucket{" "}
                                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">gallery-images</code>
                            </p>
                        </div>

                        <form onSubmit={handleUpload} className="flex flex-col gap-5">
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOver(true);
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById("gallery-file-input")?.click()}
                                className={`relative border-2 border-dashed rounded-2xl transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 ${dragOver
                                        ? "border-[#12372a] bg-[#e8fccd]/40"
                                        : "border-gray-200 hover:border-gray-300 bg-gray-50"
                                    } ${preview ? "p-2" : "p-8"}`}
                            >
                                <input
                                    id="gallery-file-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) handleFile(f);
                                    }}
                                />

                                {preview ? (
                                    <>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full rounded-xl object-cover max-h-48"
                                        />
                                        <p className="text-xs text-gray-400 pb-2">{file?.name}</p>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                                setPreview(null);
                                            }}
                                            className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-xl bg-[#e8fccd] flex items-center justify-center">
                                            <Upload size={22} className="text-[#12372a]" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-gray-700">Drop image here or click to browse</p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG, WEBP supported</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Caption</label>
                                <input
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="e.g. Medical Camp At Doru"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none transition-colors bg-white"
                                >
                                    {CATEGORIES.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={uploading || !file}
                                className="bg-[#12372a] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" /> Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={16} /> Upload Image
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-xl font-bold text-gray-900">
                                All Images <span className="text-gray-400 font-normal text-base">({items.length})</span>
                            </h2>

                            <button
                                onClick={loadItems}
                                className="text-xs text-gray-400 hover:text-[#12372a] font-semibold transition-colors"
                            >
                                ↻ Refresh
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex flex-col gap-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 animate-pulse">
                                        <div className="w-16 h-16 rounded-xl bg-gray-100 shrink-0" />
                                        <div className="flex-1 flex flex-col gap-2 justify-center">
                                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                                            <div className="h-3 bg-gray-100 rounded w-1/3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : items.length === 0 ? (
                            <div className="flex flex-col items-center py-20 text-gray-400 bg-white border border-gray-200 rounded-2xl">
                                <ImageIcon size={40} className="mb-3 opacity-20" />
                                <p className="font-medium text-gray-500">No images yet. Upload one to get started.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 group hover:shadow-sm transition-shadow"
                                        >
                                            <img
                                                src={getGalleryImageUrl(item.file_path)}
                                                alt={item.caption}
                                                className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
                                                loading="lazy"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 truncate">{item.caption}</p>
                                                <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#e8fccd] text-[#12372a] border border-[#d0f5a0]">
                                                    {item.category}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="shrink-0 p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                                aria-label={`Delete ${item.caption}`}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {toast && (
                    <Toast
                        key={toast.message}
                        message={toast.message}
                        type={toast.type}
                        onDismiss={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}