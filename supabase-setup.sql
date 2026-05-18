-- ==========================================
-- HOPE - Birthday Gift Database Schema
-- ==========================================

-- 1. PROFILES TABLE (Role mapping)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role text not null check (role in ('admin', 'user')),
  display_name text,
  created_at timestamp with time zone default now()
);

-- 2. LETTERS TABLE (Surat/Cerita)
create table public.letters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_at timestamp with time zone default now(),
  created_by uuid references public.profiles(id) on delete set null
);

-- 3. WISHES TABLE (Harapan)
create table public.wishes (
  id uuid primary key default gen_random_uuid(),
  wish_text text not null,
  status text not null default 'Menunggu Waktu' 
    check (status in ('Menunggu Waktu', 'Sedang Diusahakan', 'Terwujud ✨')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Letters
alter table public.letters enable row level security;

create policy "Anyone can read letters"
  on public.letters for select using (true);

create policy "Only admin can insert letters"
  on public.letters for insert 
  with check (
    auth.uid() in (
      select id from public.profiles where role = 'admin'
    )
  );

create policy "Only admin can update letters"
  on public.letters for update 
  using (
    auth.uid() in (
      select id from public.profiles where role = 'admin'
    )
  );

create policy "Only admin can delete letters"
  on public.letters for delete 
  using (
    auth.uid() in (
      select id from public.profiles where role = 'admin'
    )
  );

-- Wishes
alter table public.wishes enable row level security;

create policy "Anyone can read wishes"
  on public.wishes for select using (true);

create policy "Users can insert their own wishes"
  on public.wishes for insert 
  with check (auth.uid() = created_by);

create policy "Only admin can update wish status"
  on public.wishes for update 
  using (
    auth.uid() in (
      select id from public.profiles where role = 'admin'
    )
  );

-- ==========================================
-- SEED DATA (GANTI UUID SESUAI USER ANDA)
-- ==========================================
-- Setelah membuat user di Supabase Auth, jalankan:
-- INSERT INTO public.profiles (id, role, display_name) 
-- VALUES ('<ADMIN_UUID>', 'admin', 'Admin');
-- INSERT INTO public.profiles (id, role, display_name) 
-- VALUES ('<NINANG_UUID>', 'user', 'Ninang');