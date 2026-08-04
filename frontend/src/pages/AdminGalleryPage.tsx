import { useState, useEffect, useCallback, Fragment } from "react";
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
  Users,
  MessageSquare,
  PlusCircle,
  Calendar,
  Wallet,
  Share2,
  Video,
  FileText,
  Users2,
} from "lucide-react";
import {
  supabase,
  type GalleryItem,
  type Donation,
  type ContactMessage,
  type OfflineDonation,
  type Partner,
  GALLERY_BUCKET,
  GALLERY_VIDEO_BUCKET,
  GALLERY_SCHEMA,
  GALLERY_TABLE,
  DONATIONS_TABLE,
  CONTACT_TABLE,
  OFFLINE_TABLE,
  PARTNERS_TABLE,
  PARTNERS_BUCKET,
  getGalleryImageUrl,
  getGalleryVideoUrl,
  getGalleryPdfUrl,
  getPartnerPhotoUrl,
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
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium ${
        type === "success" ? "bg-[#0a301d] text-[#bcff5f]" : "bg-red-600 text-white"
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
          <p className="text-sm text-gray-500 text-center">Admin Panel — Tafheem-ul-Islam Trust</p>
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

function DonationsTable({ showToast }: { showToast: (msg: string, type: "success" | "error") => void }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDonations = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(DONATIONS_TABLE)
      .select("*")
      .eq("is_archived", false)
      .order("created_at", { ascending: false });

    if (error) {
      showToast(error.message, "error");
    } else {
      setDonations(data || []);
    }

    setLoading(false);
  }, []);

  const handleArchive = async (d: Donation) => {
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(DONATIONS_TABLE)
      .update({ is_archived: true })
      .eq("id", d.id)
      .select();
    if (error) { showToast(error.message, "error"); return; }
    if (!data || data.length === 0) {
      showToast("Could not remove — update affected 0 rows (check table UPDATE permissions).", "error");
      return;
    }
    showToast("Record removed.", "success");
    loadDonations();
  };

  useEffect(() => {
    loadDonations();
  }, [loadDonations]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900">Donor Records</h2>
          <p className="text-xs text-gray-400 mt-0.5">All donor submissions from the website</p>
        </div>
        <button
          onClick={loadDonations}
          className="text-xs text-gray-400 hover:text-[#12372a] font-semibold transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col gap-3 p-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : donations.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <Users size={36} className="mb-3 opacity-20" />
            <p className="font-medium text-gray-500 text-sm">No donor submissions yet.</p>
          </div>
        ) : (
          <>
            {/* Mobile: stacked cards */}
            <div className="md:hidden flex flex-col divide-y divide-gray-100">
              {donations.map((d) => (
                <div key={d.id} className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e8fccd] flex items-center justify-center text-[#12372a] font-bold text-sm shrink-0">
                    {d.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-gray-800 text-sm">{d.name}</span>
                      <span className="text-[11px] text-gray-400 shrink-0">{formatDate(d.created_at)}</span>
                    </div>
                    <a href={`mailto:${d.email}`} className="text-xs text-[#12372a] font-medium truncate block mt-1">{d.email}</a>
                    <span className="text-xs text-gray-500 font-mono mt-0.5 block">{d.phone}</span>
                  </div>
                  <button onClick={() => handleArchive(d)} className="shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Remove">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      Date & Time (IST)
                    </th>
                    <th className="px-3 py-3.5 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d, i) => (
                    <tr
                      key={d.id}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4 text-gray-400 font-medium">{i + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#e8fccd] flex items-center justify-center text-[#12372a] font-bold text-xs shrink-0">
                            {d.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800">{d.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600 font-mono text-sm">{d.phone}</td>
                      <td className="px-5 py-4">
                        <a
                          href={`mailto:${d.email}`}
                          className="text-[#12372a] hover:underline font-medium"
                        >
                          {d.email}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">
                        {formatDate(d.created_at)}
                      </td>
                      <td className="px-3 py-4">
                        <button onClick={() => handleArchive(d)} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Remove">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
        <span className="w-2 h-2 rounded-full bg-[#bcff5f] inline-block" />
        {donations.length} record{donations.length !== 1 ? "s" : ""} total
      </div>
    </div>
  );
}

function ContactMessagesTable({ showToast }: { showToast: (msg: string, type: "success" | "error") => void }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(CONTACT_TABLE)
      .select("*")
      .eq("is_archived", false)
      .order("created_at", { ascending: false });

    if (error) {
      showToast(error.message, "error");
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  }, []);

  const handleArchive = async (m: ContactMessage) => {
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(CONTACT_TABLE)
      .update({ is_archived: true })
      .eq("id", m.id)
      .select();
    if (error) { showToast(error.message, "error"); return; }
    if (!data || data.length === 0) {
      showToast("Could not remove — update affected 0 rows (check table UPDATE permissions).", "error");
      return;
    }
    showToast("Message removed.", "success");
    loadMessages();
  };

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900">Contact Messages</h2>
          <p className="text-xs text-gray-400 mt-0.5">Click any message row to read the message content</p>
        </div>
        <button
          onClick={loadMessages}
          className="text-xs text-gray-400 hover:text-[#12372a] font-semibold transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col gap-3 p-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <MessageSquare size={36} className="mb-3 opacity-20" />
            <p className="font-medium text-gray-500 text-sm">No contact messages received.</p>
          </div>
        ) : (
          <>
            {/* Mobile: stacked cards */}
            <div className="md:hidden flex flex-col divide-y divide-gray-100">
              {messages.map((m) => (
                <div key={m.id}>
                  <div
                    onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
                    className={`p-4 cursor-pointer transition-colors ${
                      expandedId === m.id ? "bg-green-50/30" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-800 text-sm">{m.name}</span>
                          <span className="text-[11px] text-gray-400">{formatDate(m.created_at)}</span>
                        </div>
                        <span className="text-xs text-gray-500 font-mono block truncate mt-0.5">{m.email}</span>
                        <span className="text-xs font-semibold text-gray-700 block mt-1">{m.subject}</span>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {m.message.length > 80 ? m.message.substring(0, 80) + "..." : m.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 mt-1">
                        <button onClick={(e) => { e.stopPropagation(); handleArchive(m); }} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Remove">
                          <Trash2 size={14} />
                        </button>
                        <span className="text-gray-300 text-sm">{expandedId === m.id ? "▲" : "▼"}</span>
                      </div>
                    </div>
                  </div>
                  {expandedId === m.id && (
                    <div className="px-4 pb-4 bg-green-50/40 border-t border-green-50">
                      <div className="flex flex-col gap-2 pt-3">
                        <span className="text-xs font-bold text-[#12372a] uppercase tracking-wider">Full Message</span>
                        <div className="bg-white border border-green-100 rounded-xl p-4 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                          {m.message}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-12">#</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-36">Name</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-48">Email</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-44">Subject</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Message Preview</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 whitespace-nowrap">Date</th>
                    <th className="px-3 py-3.5 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m, i) => (
                    <Fragment key={m.id}>
                      <tr
                        onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                          expandedId === m.id ? "bg-green-50/20" : ""
                        }`}
                      >
                        <td className="px-5 py-4 text-gray-400 font-medium w-12">{i + 1}</td>
                        <td className="px-5 py-4 font-semibold text-gray-800 w-36 truncate">{m.name}</td>
                        <td className="px-5 py-4 text-gray-600 font-mono text-xs w-48 truncate">{m.email}</td>
                        <td className="px-5 py-4 text-gray-800 font-medium w-44 truncate">{m.subject}</td>
                        <td className="px-5 py-4 text-gray-500 truncate">
                          {m.message.length > 55 ? m.message.substring(0, 55) + "..." : m.message}
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs w-40 whitespace-nowrap">{formatDate(m.created_at)}</td>
                        <td className="px-3 py-4" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => handleArchive(m)} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Remove">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                      {expandedId === m.id && (
                        <tr className="bg-green-50/40">
                          <td colSpan={7} className="px-10 py-6 border-t border-green-50">
                            <div className="flex flex-col gap-2 w-full">
                              <span className="text-xs font-bold text-[#12372a] uppercase tracking-wider">Full Message</span>
                              <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm text-gray-800 text-base leading-relaxed whitespace-pre-wrap font-medium w-full">
                                {m.message}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
        <span className="w-2 h-2 rounded-full bg-[#bcff5f] inline-block" />
        {messages.length} message{messages.length !== 1 ? "s" : ""} total
      </div>
    </div>
  );
}

function OfflineDonationsTab({ showToast }: { showToast: (msg: string, type: "success" | "error") => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("Charity");
  const [donationDate, setDonationDate] = useState(new Date().toISOString().split("T")[0]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<OfflineDonation[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [receiptLoading, setReceiptLoading] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState<string | null>(null);

  const loadRecords = useCallback(async () => {
    setLoadingRecords(true);
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(OFFLINE_TABLE)
      .select("*")
      .eq("is_archived", false)
      .order("created_at", { ascending: false });

    if (error) {
      showToast(error.message, "error");
    } else {
      setRecords(data || []);
    }
    setLoadingRecords(false);
  }, []);

  const handleArchive = async (r: OfflineDonation) => {
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(OFFLINE_TABLE)
      .update({ is_archived: true })
      .eq("id", r.id)
      .select();
    if (error) { showToast(error.message, "error"); return; }
    if (!data || data.length === 0) {
      showToast("Could not remove — update affected 0 rows (check table UPDATE permissions).", "error");
      return;
    }
    showToast("Record removed.", "success");
    loadRecords();
  };

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !amount || !purpose || !donationDate) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .schema(GALLERY_SCHEMA)
        .from(OFFLINE_TABLE)
        .insert({
          name,
          phone,
          amount: parseFloat(amount),
          purpose,
          donation_date: donationDate,
          address,
        });

      if (error) throw error;

      setName("");
      setPhone("");
      setAmount("");
      setPurpose("Charity");
      setDonationDate(new Date().toISOString().split("T")[0]);
      setAddress("");
      loadRecords();
    } catch (err: any) {
      showToast(err.message || "Failed to add manual entry.", "error");
    } finally {
      setLoading(false);
    }
  };

  const buildReceiptContent = (r: OfflineDonation) => {
    const formattedDate = new Date(r.donation_date).toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    });
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency", currency: "INR", maximumFractionDigits: 0,
    }).format(r.amount);
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const safeName = r.name.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
    const receiptNo = `RECP-${r.id.substring(0, 8).toUpperCase()}`;

    const lbl = (t: string) =>
      `<div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#9ca3af;line-height:13px;">${t}</div>`;
    const val = (t: string, mono = false) =>
      `<div style="font-size:14px;font-weight:600;color:#111827;line-height:20px;margin-top:4px;${mono ? "font-family:'Courier New',monospace;" : ""}">${t}</div>`;

    const receiptHtml = `<div style="background:#f1f5f9;padding:48px 44px;font-family:Arial,Helvetica,sans-serif;color:#1f2937;-webkit-text-size-adjust:100%;text-size-adjust:100%;">
  <div style="height:6px;background:#12372a;border-radius:4px 4px 0 0;"></div>
  <div style="background:#ffffff;border:1.5px solid #d1d5db;border-top:none;border-radius:0 0 14px 14px;padding:28px 32px 24px;">
    <table style="width:100%;border-collapse:collapse;border-bottom:1px solid #e5e7eb;">
      <tr>
        <td style="vertical-align:middle;padding-bottom:18px;">
          <table style="border-collapse:collapse;">
            <tr>
              <td style="vertical-align:middle;padding-right:14px;">
                <img src="https://res.cloudinary.com/dm3scoj2q/image/upload/v1780897979/T_logo_n_p9vebn.png" crossorigin="anonymous" alt="logo" style="height:54px;width:auto;max-width:160px;object-fit:contain;border-radius:12px;background:#fff;padding:8px 14px;display:block;" />
              </td>
              <td style="vertical-align:middle;">
                <div style="font-size:20px;font-weight:800;color:#12372a;line-height:24px;">Tafheem-ul-Islam Trust</div>
                <div style="font-size:10px;text-transform:uppercase;color:#6b7280;margin-top:3px;line-height:14px;">Hope &middot; Relief &middot; Community Service</div>
              </td>
            </tr>
          </table>
        </td>
        <td style="vertical-align:middle;text-align:right;padding-bottom:18px;">
          <span style="background:#12372a;color:#bcff5f;font-size:11px;font-weight:700;text-transform:uppercase;padding:7px 16px;border-radius:999px;display:inline-block;line-height:14px;white-space:nowrap;">Donation Receipt</span>
        </td>
      </tr>
    </table>
    <div style="background:#f0faf2;border:1.5px dashed #86efac;border-radius:10px;padding:14px 24px;margin-top:22px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="vertical-align:middle;">
            <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#14532d;line-height:16px;">Amount Contributed</div>
          </td>
          <td style="vertical-align:middle;text-align:right;">
            <div style="font-size:24px;font-weight:800;color:#12372a;line-height:28px;">${esc(formattedAmount)}</div>
          </td>
        </tr>
      </table>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:22px;">
      <tr>
        <td style="vertical-align:top;width:50%;padding-right:16px;padding-bottom:14px;">
          ${lbl("Received From")}${val(esc(r.name))}
        </td>
        <td style="vertical-align:top;width:50%;padding-left:16px;padding-bottom:14px;">
          ${lbl("Receipt Date")}${val(esc(formattedDate))}
        </td>
      </tr>
      <tr>
        <td style="vertical-align:top;padding-right:16px;padding-bottom:14px;">
          ${lbl("Mobile Number")}${val(esc(r.phone), true)}
        </td>
        <td style="vertical-align:top;padding-left:16px;padding-bottom:14px;">
          ${lbl("Purpose of Donation")}${val(esc(r.purpose))}
        </td>
      </tr>
      ${r.address ? `<tr><td colspan="2" style="vertical-align:top;padding-bottom:14px;">${lbl("Address")}${val(esc(r.address))}</td></tr>` : ""}
    </table>
    <div style="border-top:1px dashed #e5e7eb;margin:4px 0 22px;"></div>
    <div style="background:#fafafa;border-left:3px solid #bcff5f;border-radius:4px;padding:12px 16px;font-size:12px;font-style:italic;color:#4b5563;line-height:20px;">
      &ldquo;Thank you for your generous contribution. Tafheem-ul-Islam Trust deeply appreciates your support. Your contribution will be utilized for the welfare of orphans, widows, and needy families.&rdquo;
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:22px;">
      <tr>
        <td style="vertical-align:bottom;">
          <div style="font-family:'Courier New',monospace;font-size:10px;color:#9ca3af;line-height:14px;">No: ${receiptNo}</div>
          <div style="margin-top:6px;font-size:10px;font-weight:700;background:#e8fccd;color:#12372a;padding:5px 12px;border-radius:999px;border:1px solid #d0f5a0;display:inline-block;line-height:14px;">Offline Payment</div>
        </td>
        <td style="vertical-align:bottom;text-align:center;width:150px;">
          <div style="border-top:1px solid #9ca3af;margin-bottom:5px;"></div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#6b7280;line-height:13px;">Authorized Signatory</div>
        </td>
      </tr>
    </table>
  </div>
</div>`;

    return { receiptHtml, safeName, receiptNo };
  };

  const handlePrintReceipt = async (r: OfflineDonation) => {
    setReceiptLoading(r.id);
    try {
      const { receiptHtml, safeName, receiptNo } = buildReceiptContent(r);

      if (!window.matchMedia("(pointer: coarse)").matches) {
        const escapedName = r.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Receipt — ${escapedName}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f1f5f9; margin: 0; padding: 0; }
    @media print {
      @page { size: A4 portrait; margin: 0; }
      * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
    }
  </style>
</head>
<body>
  ${receiptHtml}
  <script>
    window.addEventListener('load', function() { setTimeout(function() { window.print(); }, 300); });
    window.addEventListener('afterprint', function() { window.close(); });
  <\/script>
</body>
</html>`;
        const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
        const blobUrl = URL.createObjectURL(blob);
        const win = window.open(blobUrl, "_blank");
        if (win) {
          setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
          return;
        }
        URL.revokeObjectURL(blobUrl);
      }

      document.getElementById("__rp_container__")?.remove();
      const container = document.createElement("div");
      container.id = "__rp_container__";
      container.style.cssText = "position:absolute;top:-9999px;left:-9999px;width:794px;";
      container.innerHTML = receiptHtml;
      document.body.appendChild(container);

      const logoImg = container.querySelector("img");
      if (logoImg && !logoImg.complete) {
        await new Promise<void>((resolve) => {
          logoImg.onload = () => resolve();
          logoImg.onerror = () => resolve();
          setTimeout(resolve, 5000);
        });
      }

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f1f5f9",
        logging: false,
        windowWidth: 794,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const imgH = (canvas.height / canvas.width) * pageW;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pageW, imgH);
      pdf.save(`Receipt-${safeName}-${receiptNo}.pdf`);

    } catch (err) {
      console.error("Receipt generation failed:", err);
      showToast("Could not generate the receipt. Please try again.", "error");
    } finally {
      document.getElementById("__rp_container__")?.remove();
      setReceiptLoading(null);
    }
  };

  const handleShareReceipt = async (r: OfflineDonation) => {
    setShareLoading(r.id);
    try {
      const { receiptHtml, safeName, receiptNo } = buildReceiptContent(r);
      const filename = `Receipt-${safeName}-${receiptNo}.pdf`;

      document.getElementById("__rp_container__")?.remove();
      const container = document.createElement("div");
      container.id = "__rp_container__";
      container.style.cssText = "position:absolute;top:-9999px;left:-9999px;width:794px;";
      container.innerHTML = receiptHtml;
      document.body.appendChild(container);

      const logoImg = container.querySelector("img");
      if (logoImg && !logoImg.complete) {
        await new Promise<void>((resolve) => {
          logoImg.onload = () => resolve();
          logoImg.onerror = () => resolve();
          setTimeout(resolve, 5000);
        });
      }

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f1f5f9",
        logging: false,
        windowWidth: 794,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const imgH = (canvas.height / canvas.width) * pageW;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pageW, imgH);

      const blob: Blob = pdf.output("blob");
      const pdfFile = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [pdfFile] })) {
        await navigator.share({
          files: [pdfFile],
          title: "Donation Receipt",
          text: `Donation receipt for ${r.name}`,
        });
      } else {
        pdf.save(filename);
      }
    } catch (err) {
      console.error("Share receipt failed:", err);
      showToast("Could not share the receipt. Please try again.", "error");
    } finally {
      document.getElementById("__rp_container__")?.remove();
      setShareLoading(null);
    }
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900">Record Offline Payment</h2>
          <p className="text-sm text-gray-400 mt-1">Add details for donations received offline</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Donor Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 99068XXXXX"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Amount (₹)</label>
            <input
              type="number"
              min="0"
              step="any"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount in INR"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Purpose</label>
            <input
              type="text"
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Charity, Orphan Support"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Donation Date</label>
            <input
              type="date"
              required
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none bg-white font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Donor's physical address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none bg-white resize-none h-20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#12372a] text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </div>

      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-gray-900">Offline Records</h2>
            <p className="text-xs text-gray-400 mt-0.5">List of all manually recorded offline donations</p>
          </div>
          <button
            onClick={loadRecords}
            className="text-xs text-gray-400 hover:text-[#12372a] font-semibold transition-colors"
          >
            ↻ Refresh
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {loadingRecords ? (
            <div className="flex flex-col gap-3 p-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-gray-400 bg-white">
              <Users size={40} className="mb-3 opacity-20" />
              <p className="font-medium text-gray-500">No offline entries recorded yet.</p>
            </div>
          ) : (
            <>
              {/* Mobile: stacked cards */}
              <div className="md:hidden flex flex-col divide-y divide-gray-100">
                {records.map((r) => (
                  <div key={r.id} className="p-4 flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-semibold text-gray-800 text-sm block">{r.name}</span>
                          {r.address && <span className="text-xs text-gray-400 truncate block mt-0.5">{r.address}</span>}
                        </div>
                        <span className="font-bold text-gray-900 text-sm shrink-0">{formatCurrency(r.amount)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs text-gray-500 font-mono">{r.phone}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{r.purpose}</span>
                        <span className="text-xs text-gray-400">{r.donation_date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => handlePrintReceipt(r)}
                        disabled={receiptLoading === r.id || shareLoading === r.id}
                        className="bg-green-50 text-[#12372a] hover:bg-[#12372a] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-green-200/50 disabled:opacity-60 disabled:cursor-wait flex items-center gap-1"
                      >
                        {receiptLoading === r.id ? (
                          <><Loader2 size={11} className="animate-spin" /> PDF</>
                        ) : "Receipt"}
                      </button>
                      <button
                        onClick={() => handleShareReceipt(r)}
                        disabled={shareLoading === r.id || receiptLoading === r.id}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-blue-200/50 disabled:opacity-60 disabled:cursor-wait flex items-center gap-1"
                      >
                        {shareLoading === r.id ? (
                          <><Loader2 size={11} className="animate-spin" /> Sharing…</>
                        ) : <><Share2 size={11} /> Share</>}
                      </button>
                      <button onClick={() => handleArchive(r)} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors self-end" aria-label="Remove">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop: table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Donor</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Purpose</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr
                        key={r.id}
                        className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 text-gray-400 font-medium">{i + 1}</td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">{r.name}</span>
                            {r.address && <span className="text-xs text-gray-400 mt-0.5">{r.address}</span>}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600 font-mono text-sm">{r.phone}</td>
                        <td className="px-5 py-4 font-bold text-gray-900">{formatCurrency(r.amount)}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{r.purpose}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{r.donation_date}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handlePrintReceipt(r)}
                              disabled={receiptLoading === r.id || shareLoading === r.id}
                              className="bg-green-50 text-[#12372a] hover:bg-[#12372a] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-green-200/50 disabled:opacity-60 disabled:cursor-wait flex items-center gap-1"
                            >
                              {receiptLoading === r.id ? (
                                <><Loader2 size={11} className="animate-spin" /> Generating…</>
                              ) : "Receipt"}
                            </button>
                            <button
                              onClick={() => handleShareReceipt(r)}
                              disabled={shareLoading === r.id || receiptLoading === r.id}
                              className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-blue-200/50 disabled:opacity-60 disabled:cursor-wait flex items-center gap-1"
                            >
                              {shareLoading === r.id ? (
                                <><Loader2 size={11} className="animate-spin" /> Sharing…</>
                              ) : <><Share2 size={11} /> Share</>}
                            </button>
                            <button onClick={() => handleArchive(r)} className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Remove">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
          <span className="w-2 h-2 rounded-full bg-[#bcff5f] inline-block" />
          {records.length} record{records.length !== 1 ? "s" : ""} total
        </div>
      </div>
    </div>
  );
}

function PartnersTab({ showToast }: { showToast: (msg: string, type: "success" | "error") => void }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerDescription, setPartnerDescription] = useState("");
  const [partnerFile, setPartnerFile] = useState<File | null>(null);
  const [partnerPreview, setPartnerPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const loadPartners = useCallback(async () => {
    setLoadingRecords(true);
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(PARTNERS_TABLE)
      .select("*")
      .eq("is_archived", false)
      .order("created_at", { ascending: true });
    if (error) {
      showToast(error.message, "error");
    } else {
      setPartners(data || []);
    }
    setLoadingRecords(false);
  }, []);

  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  const handlePartnerFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      showToast("Only image files are allowed for partner photos.", "error");
      return;
    }
    setPartnerFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPartnerPreview((e.target?.result as string) || null);
    reader.readAsDataURL(f);
  };

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerFile || !partnerName.trim() || !partnerDescription.trim()) {
      showToast("Please fill all fields and select a photo.", "error");
      return;
    }
    setUploading(true);
    const safeName = `${Date.now()}-${partnerFile.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const { error: uploadError } = await supabase.storage
      .from(PARTNERS_BUCKET)
      .upload(safeName, partnerFile, { cacheControl: "3600", upsert: false });
    if (uploadError) {
      setUploading(false);
      if (uploadError.message.toLowerCase().includes("bucket") || uploadError.message.toLowerCase().includes("not found")) {
        showToast(`Storage bucket "${PARTNERS_BUCKET}" not found. Please create it in Supabase Storage dashboard (set to Public).`, "error");
      } else {
        showToast(uploadError.message, "error");
      }
      return;
    }
    const { error: insertError } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(PARTNERS_TABLE)
      .insert({ name: partnerName.trim(), description: partnerDescription.trim(), photo_path: safeName });
    if (insertError) {
      await supabase.storage.from(PARTNERS_BUCKET).remove([safeName]);
      setUploading(false);
      showToast(insertError.message, "error");
      return;
    }
    setUploading(false);
    setPartnerFile(null);
    setPartnerPreview(null);
    setPartnerName("");
    setPartnerDescription("");
    showToast("Partner added successfully!", "success");
    loadPartners();
  };

  const handleDeletePartner = async (partner: Partner) => {
    const confirmed = window.confirm(`Remove "${partner.name}"? This cannot be undone.`);
    if (!confirmed) return;
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(PARTNERS_TABLE)
      .update({ is_archived: true })
      .eq("id", partner.id)
      .select();
    if (error) {
      showToast(error.message, "error");
      return;
    }
    if (!data || data.length === 0) {
      showToast("Could not remove — update affected 0 rows (check table UPDATE permissions).", "error");
      return;
    }
    const { error: storageError } = await supabase.storage.from(PARTNERS_BUCKET).remove([partner.photo_path]);
    if (storageError) {
      showToast(`Partner removed, but photo cleanup failed: ${storageError.message}`, "error");
      loadPartners();
      return;
    }
    showToast("Partner removed.", "success");
    loadPartners();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900">Add Partner</h2>
          <p className="text-sm text-gray-400 mt-1">Upload photo, name, and description</p>
        </div>
        <form onSubmit={handleAddPartner} className="flex flex-col gap-5">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) handlePartnerFile(f); }}
            onClick={() => document.getElementById("partner-file-input")?.click()}
            className={`relative border-2 border-dashed rounded-2xl transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 ${
              dragOver ? "border-[#12372a] bg-[#e8fccd]/40" : "border-gray-200 hover:border-gray-300 bg-gray-50"
            } ${partnerPreview ? "p-2" : "p-8"}`}
          >
            <input id="partner-file-input" type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePartnerFile(f); }} />
            {partnerPreview ? (
              <>
                <img src={partnerPreview} alt="Partner preview" className="w-full rounded-xl object-cover max-h-48" />
                <p className="text-xs text-gray-400 pb-2">{partnerFile?.name}</p>
                <button type="button"
                  onClick={(e) => { e.stopPropagation(); setPartnerFile(null); setPartnerPreview(null); }}
                  className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-[#e8fccd] flex items-center justify-center">
                  <Upload size={22} className="text-[#12372a]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700">Drop partner photo or click to browse</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG, WEBP</p>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Partner Name</label>
            <input type="text" required value={partnerName} onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Organisation or individual name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none bg-white" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea required value={partnerDescription} onChange={(e) => setPartnerDescription(e.target.value)}
              placeholder="Brief description of the partner"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#12372a] text-sm outline-none bg-white resize-none h-24" />
          </div>
          <button type="submit" disabled={uploading || !partnerFile}
            className="bg-[#12372a] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            {uploading ? (
              <><Loader2 size={16} className="animate-spin" /> Adding...</>
            ) : (
              <><PlusCircle size={16} /> Add Partner</>
            )}
          </button>
        </form>
      </div>

      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-gray-900">
            All Partners <span className="text-gray-400 font-normal text-base">({partners.length})</span>
          </h2>
          <button onClick={loadPartners} className="text-xs text-gray-400 hover:text-[#12372a] font-semibold transition-colors">
            ↻ Refresh
          </button>
        </div>
        {loadingRecords ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 animate-pulse">
                <div className="w-16 h-16 rounded-xl bg-gray-100 shrink-0" />
                <div className="flex-1 flex flex-col gap-2 justify-center">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : partners.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-gray-400 bg-white border border-gray-200 rounded-2xl">
            <Users2 size={40} className="mb-3 opacity-20" />
            <p className="font-medium text-gray-500">No partners yet. Add one above.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
            <AnimatePresence>
              {partners.map((partner) => (
                <motion.div key={partner.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 group hover:shadow-sm transition-shadow">
                  <img src={getPartnerPhotoUrl(partner.photo_path)} alt={partner.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{partner.name}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{partner.description}</p>
                  </div>
                  <button onClick={() => handleDeletePartner(partner)}
                    className="shrink-0 p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label={`Delete ${partner.name}`}>
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminGalleryPage() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string; type: "success" | "error" } | null>(null);

  const [activeTab, setActiveTab] = useState<"gallery" | "donors" | "contact" | "offline" | "partners">("gallery");

  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [mediaType, setMediaType] = useState<"image" | "video" | "pdf">("image");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const showToast = (message: string, type: "success" | "error") =>
    setToast({ id: Date.now(), message, type });

  // PDFs share the images bucket; only videos get their own.
  const bucketFor = (t: "image" | "video" | "pdf") =>
    t === "video" ? GALLERY_VIDEO_BUCKET : GALLERY_BUCKET;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setSessionChecked(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
      setSessionChecked(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadItems = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(GALLERY_TABLE)
      .select("*")
      .eq("is_archived", false)
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
    const isVideo = f.type.startsWith("video/");
    const isImage = f.type.startsWith("image/");
    const isPdf = f.type === "application/pdf";
    if (!isImage && !isVideo && !isPdf) {
      showToast("Only image, video, or PDF files are allowed.", "error");
      return;
    }

    setMediaType(isVideo ? "video" : isPdf ? "pdf" : "image");
    setFile(f);

    if (isPdf) {
      setPreview(null);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => setPreview((e.target?.result as string) || null);
      reader.readAsDataURL(f);
    }

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
      showToast("Please select a file and enter a caption.", "error");
      return;
    }

    setUploading(true);

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const bucket = bucketFor(mediaType);

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(safeName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setUploading(false);
      if (uploadError.message.toLowerCase().includes("bucket") || uploadError.message.toLowerCase().includes("not found")) {
        showToast(`Storage bucket "${bucket}" not found. Please create it in Supabase Storage dashboard (set to Public).`, "error");
      } else {
        showToast(uploadError.message, "error");
      }
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
        media_type: mediaType,
      });

    if (insertError) {
      await supabase.storage.from(bucket).remove([safeName]);
      setUploading(false);
      showToast(insertError.message, "error");
      return;
    }

    setUploading(false);
    setFile(null);
    setPreview(null);
    setCaption("");
    setCategory(CATEGORIES[0]);
    setMediaType("image");
    showToast(`${mediaType === "video" ? "Video" : mediaType === "pdf" ? "PDF" : "Image"} uploaded successfully!`, "success");
    loadItems();
  };

  const handleDelete = async (item: GalleryItem) => {
    const confirmed = window.confirm(`Remove "${item.caption}"? This cannot be undone.`);
    if (!confirmed) return;

    const { error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(GALLERY_TABLE)
      .update({ is_archived: true })
      .eq("id", item.id);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    const bucket = item.media_type === "video" ? GALLERY_VIDEO_BUCKET : GALLERY_BUCKET;
    const { error: storageError } = await supabase.storage.from(bucket).remove([item.file_path]);
    if (storageError) {
      showToast(`Item removed, but file cleanup failed: ${storageError.message}`, "error");
      loadItems();
      return;
    }

    showToast("Item removed.", "success");
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
              <h1 className="font-display font-bold text-gray-900 text-base leading-tight">Admin Panel</h1>
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

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12 flex flex-col gap-8">
        <div className="mx-auto flex justify-center bg-[#0a301d] p-1 sm:p-1.5 rounded-2xl sm:rounded-full shadow-md max-w-2xl w-full gap-1 sm:gap-2 mt-4">
          {[
            { id: "gallery", label: "Gallery", icon: ImageIcon },
            { id: "donors", label: "Donors", icon: Users },
            { id: "contact", label: "Contact", icon: MessageSquare },
            { id: "partners", label: "Partners", icon: Users2 },
            { id: "offline", label: "Offline", icon: Wallet },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 sm:py-3 px-1 sm:px-5 rounded-xl sm:rounded-full font-bold text-[11px] sm:text-sm md:text-base transition-all flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2.5 outline-none leading-tight ${
                  active
                    ? "bg-[#bcff5f] text-[#0a301d] shadow-md"
                    : "text-white hover:text-[#bcff5f] hover:bg-white/10"
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          {activeTab === "gallery" && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {[
                  { label: "Total Media", value: items.length },
                  { label: "Categories", value: new Set(items.map((i) => i.category)).size },
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
                    <h2 className="font-display text-xl font-bold text-gray-900">Upload Media</h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Images → <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">gallery-images</code>
                      {" "}· Videos → <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">gallery-videos</code>
                      {" "}· PDFs → <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">gallery-images</code>
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
                      className={`relative border-2 border-dashed rounded-2xl transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 ${
                        dragOver
                          ? "border-[#12372a] bg-[#e8fccd]/40"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50"
                      } ${preview ? "p-2" : "p-8"}`}
                    >
                      <input
                        id="gallery-file-input"
                        type="file"
                        accept="image/*,video/*,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFile(f);
                        }}
                      />

                      {file ? (
                        <>
                          {mediaType === "pdf" ? (
                            <div className="w-full rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2 py-10">
                              <FileText size={36} className="text-[#12372a]" />
                              <p className="text-xs text-gray-500 font-medium">PDF selected</p>
                            </div>
                          ) : mediaType === "video" ? (
                            <video src={preview ?? undefined} controls className="w-full rounded-xl max-h-48" />
                          ) : (
                            <img src={preview ?? undefined} alt="Preview" className="w-full rounded-xl object-cover max-h-48" />
                          )}
                          <p className="text-xs text-gray-400 pb-2">{file?.name}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                              setPreview(null);
                              setMediaType("image");
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
                            <p className="text-sm font-semibold text-gray-700">Drop image, video or PDF here or click to browse</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP · MP4, MOV, WEBM · PDF</p>
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
                          <Upload size={16} /> Upload {mediaType === "video" ? "Video" : mediaType === "pdf" ? "PDF" : "Image"}
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-3 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold text-gray-900">
                      All Media <span className="text-gray-400 font-normal text-base">({items.length})</span>
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
                      <p className="font-medium text-gray-500">No media yet. Upload one to get started.</p>
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
                            {item.media_type === "video" ? (
                              <video
                                src={getGalleryVideoUrl(item.file_path)}
                                className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
                                muted
                                playsInline
                                preload="metadata"
                              />
                            ) : item.media_type === "pdf" ? (
                              <a
                                href={getGalleryPdfUrl(item.file_path)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-16 h-16 rounded-xl shrink-0 bg-[#e8fccd] flex items-center justify-center"
                                aria-label={`Open PDF: ${item.caption}`}
                              >
                                <FileText size={24} className="text-[#12372a]" />
                              </a>
                            ) : (
                              <img
                                src={getGalleryImageUrl(item.file_path)}
                                alt={item.caption}
                                className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
                                loading="lazy"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">{item.caption}</p>
                              <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#e8fccd] text-[#12372a] border border-[#d0f5a0]">
                                {item.category}
                              </span>
                            </div>

                            <button
                              onClick={() => handleDelete(item)}
                              className="shrink-0 p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors sm:opacity-0 sm:group-hover:opacity-100"
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
            </div>
          )}

          {activeTab === "donors" && <DonationsTable showToast={showToast} />}

          {activeTab === "contact" && <ContactMessagesTable showToast={showToast} />}

          {activeTab === "offline" && <OfflineDonationsTab showToast={showToast} />}

          {activeTab === "partners" && <PartnersTab showToast={showToast} />}
        </div>
      </main>

      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onDismiss={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}