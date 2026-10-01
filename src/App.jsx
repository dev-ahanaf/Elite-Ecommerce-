import React from 'react';
import { ShopProvider } from './context/ShopContext';
import TopBar from './components/Header/TopBar';
import Navbar from './components/Header/Navbar';
import CategoryNav from './components/Header/CategoryNav';
import HeroBanner from './components/Hero/HeroBanner';
import BestCategories from './components/Categories/BestCategories';
import ForYouGrid from './components/Products/ForYouGrid';
import PromoBanner from './components/Promo/PromoBanner';
import TrendingSection from './components/Products/TrendingSection';
import DealsOfTheDay from './components/Deals/DealsOfTheDay';
import RightSidebar from './components/Sidebar/RightSidebar';
import CastleChronicles from './components/Blog/CastleChronicles';
import FAQAccordion from './components/FAQ/FAQAccordion';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/Modals/CartDrawer';
import WishlistDrawer from './components/Modals/WishlistDrawer';
import QuickViewModal from './components/Modals/QuickViewModal';
import SignInModal from './components/Modals/SignInModal';
import ToastContainer from './components/Toast/ToastContainer';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col antialiased selection:bg-emerald-600 selection:text-white">
        
        {/* HEADER & NAVIGATION */}
        <TopBar />
        <Navbar />
        <CategoryNav />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 space-y-4 sm:space-y-6">
          
          {/* HERO SECTION */}
          <HeroBanner />

          {/* BEST CATEGORIES */}
          <BestCategories />

          {/* PRODUCT GRID: FOR YOU */}
          <ForYouGrid />

          {/* PROMO BANNER */}
          <PromoBanner />

          {/* TRENDING PRODUCTS */}
          <TrendingSection />

          {/* DEALS OF THE DAY */}
          <DealsOfTheDay />

          {/* DEDICATED DESKTOP 2ND COLUMN / SIDEBAR SECTION */}
          <section className="max-w-7xl mx-auto px-4 py-8">
            <RightSidebar />
          </section>

          {/* CASTLE CHRONICLES BLOG */}
          <CastleChronicles />

          {/* FREQUENTLY ASKED QUESTIONS */}
          <FAQAccordion />

        </main>

        {/* FOOTER */}
        <Footer />

        {/* INTERACTIVE DRAWERS & MODALS */}
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <SignInModal />
        <ToastContainer />

      </div>
    </ShopProvider>
  );
}
