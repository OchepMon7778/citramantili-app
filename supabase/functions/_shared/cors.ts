// supabase/functions/_shared/cors.ts

// Ini adalah "kartu ID" atau "surat izin" keamanan (CORS Headers).
// Kode ini memperbolehkan aplikasi React Anda (yang berjalan di domain lain)
// untuk berkomunikasi dengan Edge Function ini.

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
