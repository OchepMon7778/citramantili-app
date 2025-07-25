import React, { useState, useEffect } from "react";
// PERBAIKAN: Impor createClient langsung dari library yang sudah diinstall oleh CodeSandbox
import { createClient } from "@supabase/supabase-js";

// --- PERBAIKAN: Inisialisasi Supabase Client di luar komponen ---
// Ini adalah cara yang lebih andal dan standar untuk lingkungan seperti CodeSandbox.
const supabaseUrl = "https://vzkfyisefbgxtrsenmn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6a2Z5c2lzZWZieGd6dHJzZW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzgxMTIsImV4cCI6MjA2ODg1NDExMn0.H_-aCCWXJNPA2abOz1yXwKu6JYDnrCR_RKcZLAGX28E";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Ikon SVG (Tidak perlu diubah, ini untuk ikon-ikon kecil) ---
const StarIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
const ArrowLeftIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

// --- KOMPONEN UI ---
function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* PERBAIKAN: Menggunakan tag <img> dengan URL dari Supabase Storage */}
          <img
            src="https://vzkfysisefbxgztrsemn.supabase.co/storage/v1/object/public/assets//Logo%20CitraMantili.jpg"
            alt="Logo Citra Mantili"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold text-slate-800">
            Citra Mantili
          </span>
        </div>
        <button className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-slate-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

function ServiceCard({ service, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1 rounded-full">
          {service.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-cyan-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-md font-semibold text-cyan-500 mt-1">
          Rp {service.price.toLocaleString("id-ID")}{" "}
          <span className="text-slate-500 font-normal text-sm">
            / {service.unit_name}
          </span>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-800 text-white mt-16">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} citramantili.id. All rights
          reserved.
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Powered by React, Tailwind, and Supabase
        </p>
      </div>
    </footer>
  );
}

// --- HALAMAN-HALAMAN APLIKASI ---

function HomePage({ services, onSelectService, loading, error }) {
  if (loading) {
    return <div className="text-center py-16">Loading services...</div>;
  }
  if (error) {
    return <div className="text-center py-16 text-red-600">Error: {error}</div>;
  }
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
        Temukan Petualangan Anda
      </h1>
      <p className="text-slate-500 mb-8">
        Booking villa, rafting, dan aktivitas lainnya dengan mudah.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => onSelectService(service.id)}
          />
        ))}
      </div>
    </main>
  );
}

function ServiceDetailPage({ service, onBack }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 font-semibold mb-6 hover:text-cyan-600 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Kembali ke Semua Layanan
      </button>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl"
          />
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
            <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full">
              {service.category}
            </span>
            <h1 className="text-3xl font-bold text-slate-800 mt-3">
              {service.name}
            </h1>
            <p className="text-slate-600 mt-4 text-base leading-relaxed">
              {service.description}
            </p>
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-cyan-600">
                  Rp {service.price.toLocaleString("id-ID")}
                </p>
                <span className="text-slate-500 font-normal text-sm">
                  / {service.unit_name}
                </span>
              </div>
              <button
                onClick={() =>
                  alert("Langkah selanjutnya: Halaman Booking & Kalender!")
                }
                className="w-full mt-4 bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-transform transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// --- KOMPONEN UTAMA APLIKASI (App) ---
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efek untuk mengambil data layanan
  useEffect(() => {
    async function getServicesViaFunction() {
      setLoading(true);
      setError(null);

      // Gunakan client supabase yang sudah diinisialisasi di atas
      const { data: servicesData, error: functionError } =
        await supabase.functions.invoke("get-services-proxy");

      if (functionError) {
        console.error("Error invoking function:", functionError);
        setError(functionError.message);
      } else if (servicesData) {
        const formattedServices = servicesData.map((s) => ({
          ...s,
          price: s.price_per_unit,
          image:
            s.image_urls &&
            Array.isArray(s.image_urls) &&
            s.image_urls.length > 0
              ? s.image_urls[0].url
              : "https://placehold.co/600x400?text=Citra+Mantili",
        }));
        setServices(formattedServices);
      }
      setLoading(false);
    }

    getServicesViaFunction();
  }, []); // Cukup dijalankan sekali saat komponen dimuat

  // --- FUNGSI NAVIGASI ---
  const handleSelectService = (id) => {
    setSelectedServiceId(id);
    setPage("detail");
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedServiceId(null);
    setPage("home");
  };

  // --- RENDER HALAMAN BERDASARKAN STATE ---
  const renderPage = () => {
    if (loading) {
      return <div className="text-center py-16">Loading...</div>;
    }

    switch (page) {
      case "detail":
        const selectedService = services.find(
          (s) => s.id === selectedServiceId
        );
        return selectedService ? (
          <ServiceDetailPage
            service={selectedService}
            onBack={handleBackToHome}
          />
        ) : (
          <HomePage
            services={services}
            onSelectService={handleSelectService}
            loading={loading}
            error={error}
          />
        );

      case "home":
      default:
        return (
          <HomePage
            services={services}
            onSelectService={handleSelectService}
            loading={loading}
            error={error}
          />
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
}
