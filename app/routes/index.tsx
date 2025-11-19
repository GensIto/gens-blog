import { createRoute } from "honox/factory";
import { Timeline, TIMELINE_DATA } from "../components/Timeline";
import { ProfileCard } from "../components/ProfileCard";

export default createRoute((c) => {
  return c.render(
    <div class='min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200'>
      {/* Hero Section */}
      <div class='container mx-auto px-4 py-12'>
        <div class='max-w-6xl mx-auto'>
          {/* Bento Grid Layout */}
          <div class='grid grid-cols-1 md:grid-cols-12 gap-4 mb-8'>
            {/* Profile Card - Large */}
            <ProfileCard />

            {/* Quick Links - Vertical */}
            <div class='md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4'>
              <a
                href='/posts'
                class='card from-primary bg-base-100 to-primary-focus text-primary-content shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105'
                style='transform-style: preserve-3d;'
              >
                <div class='card-body p-6'>
                  <h3 class='card-title text-lg'>ブログ</h3>
                  <p class='text-sm opacity-90'>技術記事を読む</p>
                </div>
              </a>
            </div>
          </div>

          {/* Timeline Section */}
          <div class='card bg-base-100 shadow-xl mb-8'>
            <div class='card-body'>
              <h2 class='card-title text-2xl mb-6'>職歴</h2>
              <Timeline data={TIMELINE_DATA} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
