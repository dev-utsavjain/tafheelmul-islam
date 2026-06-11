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
  Users,
  MessageSquare,
  PlusCircle,
  Calendar,
  Wallet,
} from "lucide-react";
import {
  supabase,
  type GalleryItem,
  type Donation,
  type ContactMessage,
  type OfflineDonation,
  GALLERY_BUCKET,
  GALLERY_SCHEMA,
  GALLERY_TABLE,
  DONATIONS_TABLE,
  CONTACT_TABLE,
  OFFLINE_TABLE,
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
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium ${
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

function DonationsTable() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDonations = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(DONATIONS_TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setDonations(data || []);
    }

    setLoading(false);
  }, []);

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
          <div className="overflow-x-auto">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
        <span className="w-2 h-2 rounded-full bg-[#bcff5f] inline-block" />
        {donations.length} record{donations.length !== 1 ? "s" : ""} total
      </div>
    </div>
  );
}

function ContactMessagesTable() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(CONTACT_TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setMessages(data || []);
    }
    setLoading(false);
  }, []);

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
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-12">#</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-36">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-48">Email</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-44">Subject</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Message Preview</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m, i) => (
                  <tr key={m.id} className="border-b border-gray-50 last:border-b-0">
                    <td colSpan={6} className="p-0">
                      <table className="w-full text-sm table-fixed">
                        <tbody>
                          <tr
                            onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
                            className={`hover:bg-gray-50 transition-colors cursor-pointer ${
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
                          </tr>
                          {expandedId === m.id && (
                            <tr className="bg-green-50/40">
                              <td colSpan={6} className="px-10 py-6 border-t border-green-50">
                                <div className="flex flex-col gap-2 w-full">
                                  <span className="text-xs font-bold text-[#12372a] uppercase tracking-wider">Full Message</span>
                                  <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm text-gray-800 text-base leading-relaxed whitespace-pre-wrap font-medium w-full">
                                    {m.message}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
        <span className="w-2 h-2 rounded-full bg-[#bcff5f] inline-block" />
        {messages.length} message{messages.length !== 1 ? "s" : ""} total
      </div>
    </div>
  );
}

function OfflineDonationsTab() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("Charity");
  const [donationDate, setDonationDate] = useState(new Date().toISOString().split("T")[0]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<OfflineDonation[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

  const loadRecords = useCallback(async () => {
    setLoadingRecords(true);
    const { data, error } = await supabase
      .schema(GALLERY_SCHEMA)
      .from(OFFLINE_TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setRecords(data || []);
    }
    setLoadingRecords(false);
  }, []);

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
      alert(err.message || "Failed to add manual entry.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrintReceipt = (r: OfflineDonation) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const formattedDate = new Date(r.donation_date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(r.amount);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Donation Receipt - ${r.name}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          body {
            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
            background: #fff;
            width: 210mm;
            min-height: 297mm;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 24mm 18mm;
            color: #1f2937;
          }

          .page {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0;
          }

          /* ─── TOP BORDER STRIPE ─── */
          .stripe {
            height: 6px;
            background: #12372a;
            border-radius: 4px 4px 0 0;
            margin-bottom: 0;
          }

          /* ─── MAIN CARD ─── */
          .card {
            border: 1.5px solid #d1d5db;
            border-top: none;
            border-radius: 0 0 12px 12px;
            padding: 28px 32px 24px;
            display: flex;
            flex-direction: column;
            gap: 22px;
          }

          /* ─── HEADER ─── */
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 18px;
            border-bottom: 1px solid #e5e7eb;
          }

          .header-left {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .logo {
            width: 56px;
            height: 56px;
            object-fit: contain;
            border-radius: 8px;
          }

          .org-name {
            font-size: 19px;
            font-weight: 800;
            color: #12372a;
            line-height: 1.2;
          }

          .org-sub {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #6b7280;
            margin-top: 3px;
          }

          .receipt-badge {
            background: #12372a;
            color: #bcff5f;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            padding: 6px 16px;
            border-radius: 999px;
          }

          /* ─── AMOUNT HIGHLIGHT ─── */
          .amount-row {
            background: #f0faf2;
            border: 1.5px dashed #86efac;
            border-radius: 10px;
            padding: 14px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .amount-label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #14532d;
          }

          .amount-value {
            font-size: 24px;
            font-weight: 800;
            color: #12372a;
            letter-spacing: -0.02em;
          }

          /* ─── DETAILS GRID ─── */
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px 32px;
          }

          .field {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }

          .field-label {
            font-size: 9.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            color: #9ca3af;
          }

          .field-value {
            font-size: 13.5px;
            font-weight: 600;
            color: #111827;
            line-height: 1.4;
          }

          .field-value.mono {
            font-family: 'Courier New', monospace;
          }

          /* ─── DIVIDER ─── */
          .divider {
            border: none;
            border-top: 1px dashed #e5e7eb;
            margin: 0;
          }

          /* ─── QUOTE ─── */
          .quote {
            background: #fafafa;
            border-left: 3px solid #bcff5f;
            border-radius: 4px;
            padding: 12px 16px;
            font-size: 11.5px;
            font-style: italic;
            color: #4b5563;
            line-height: 1.65;
          }

          /* ─── FOOTER ROW ─── */
          .footer-row {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding-top: 6px;
          }

          .receipt-no {
            font-family: 'Courier New', monospace;
            font-size: 10px;
            color: #9ca3af;
          }

          .payment-pill {
            font-size: 10px;
            font-weight: 700;
            background: #e8fccd;
            color: #12372a;
            padding: 4px 12px;
            border-radius: 999px;
            border: 1px solid #d0f5a0;
          }

          .signature-area {
            text-align: center;
            min-width: 130px;
          }

          .sig-line {
            border-top: 1px solid #9ca3af;
            margin-bottom: 5px;
          }

          .sig-label {
            font-size: 9.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #6b7280;
          }

          @media print {
            body { padding: 24mm 18mm; }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="stripe"></div>
          <div class="card">

            <!-- HEADER -->
            <div class="header">
              <div class="header-left">
                <img
                  src="https://res.cloudinary.com/dm3scoj2q/image/upload/v1780897979/T_logo_n_p9vebn.png"
                  class="logo"
                  alt="Tafheem-ul-Islam Trust Logo"
                />
                <div>
                  <div class="org-name">Tafheem-ul-Islam Trust</div>
                  <div class="org-sub">Hope · Relief · Community Service</div>
                </div>
              </div>
              <div class="receipt-badge">Donation Receipt</div>
            </div>

            <!-- AMOUNT -->
            <div class="amount-row">
              <span class="amount-label">Amount Contributed</span>
              <span class="amount-value">${formattedAmount}</span>
            </div>

            <!-- DONOR + DONATION DETAILS -->
            <div class="details-grid">
              <div class="field">
                <span class="field-label">Received From</span>
                <span class="field-value">${r.name}</span>
              </div>
              <div class="field">
                <span class="field-label">Receipt Date</span>
                <span class="field-value">${formattedDate}</span>
              </div>
              <div class="field">
                <span class="field-label">Mobile Number</span>
                <span class="field-value mono">${r.phone}</span>
              </div>
              <div class="field">
                <span class="field-label">Purpose of Donation</span>
                <span class="field-value">${r.purpose}</span>
              </div>
              ${r.address ? `
              <div class="field" style="grid-column: span 2;">
                <span class="field-label">Address</span>
                <span class="field-value">${r.address}</span>
              </div>
              ` : ''}
            </div>

            <hr class="divider" />

            <!-- QUOTE -->
            <div class="quote">
              "Thank you for your generous contribution. Tafheem-ul-Islam Trust deeply appreciates your
              support. Your contribution will be utilized for the welfare of orphans, widows, and needy families."
            </div>

            <!-- FOOTER -->
            <div class="footer-row">
              <div>
                <div class="receipt-no">No: RECP-${r.id.substring(0, 8).toUpperCase()}</div>
                <div class="payment-pill" style="margin-top: 6px;">Offline Payment</div>
              </div>
              <div class="signature-area">
                <div class="sig-line"></div>
                <div class="sig-label">Authorized Signatory</div>
              </div>
            </div>

          </div>
        </div>

        <script>
          window.onload = function () {
            window.print();
            setTimeout(function () { window.close(); }, 500);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
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
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Donor</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Purpose</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Receipt</th>
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
                        <button
                          onClick={() => handlePrintReceipt(r)}
                          className="bg-green-50 text-[#12372a] hover:bg-[#12372a] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-green-200/50"
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export function AdminGalleryPage() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [activeTab, setActiveTab] = useState<"gallery" | "donors" | "contact" | "offline">("gallery");

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

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12 flex flex-col gap-8">
        <div className="mx-auto flex justify-center bg-[#0a301d] p-1.5 rounded-full shadow-md max-w-2xl w-full gap-2 mt-4">
          {[
            { id: "gallery", label: "Gallery", icon: ImageIcon },
            { id: "donors", label: "Donors", icon: Users },
            { id: "contact", label: "Contact", icon: MessageSquare },
            { id: "offline", label: "Offline Entry", icon: Wallet },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-6 rounded-full font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2.5 outline-none ${
                  active
                    ? "bg-[#bcff5f] text-[#0a301d] shadow-md"
                    : "text-white hover:text-[#bcff5f] hover:bg-white/10"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          {activeTab === "gallery" && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {[
                  { label: "Total Images", value: items.length },
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
                      className={`relative border-2 border-dashed rounded-2xl transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 ${
                        dragOver
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
            </div>
          )}

          {activeTab === "donors" && <DonationsTable />}

          {activeTab === "contact" && <ContactMessagesTable />}

          {activeTab === "offline" && <OfflineDonationsTab />}
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