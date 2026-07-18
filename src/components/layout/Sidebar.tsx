import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Navigation as NavIcon,
  Clock,
  Users,
  Siren,
  Bus,
  User,
  Settings,
  SlidersHorizontal,
  Activity,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

interface SidebarProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

const allNavItems = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_VISITOR"],
  },
  {
    to: "/chat",
    icon: MessageSquare,
    key: "chat",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_VISITOR"],
  },
  {
    to: "/navigation",
    icon: NavIcon,
    key: "navigation",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_VISITOR"],
  },
  {
    to: "/queue",
    icon: Clock,
    key: "queue",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_VISITOR"],
  },
  {
    to: "/crowd",
    icon: Users,
    key: "crowd",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR"],
  },
  {
    to: "/emergency",
    icon: Siren,
    key: "emergency",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR"],
  },
  {
    to: "/transport",
    icon: Bus,
    key: "transport",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_VISITOR"],
  },
  {
    to: "/operations",
    icon: SlidersHorizontal,
    key: "operations",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR"],
  },
];

const bottomItems = [
  {
    to: "/profile",
    icon: User,
    key: "profile",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_VISITOR"],
  },
  {
    to: "/settings",
    icon: Settings,
    key: "settings",
    roles: ["ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_VISITOR"],
  },
];

export function Sidebar({
  collapsed,
  onNavigate,
}: SidebarProps) {
  const { t } = useLanguage();

  const role = localStorage.getItem("matchday_role");

  const navItems = allNavItems.filter((item) =>
    item.roles.includes(role || "")
  );

  const footerItems = bottomItems.filter((item) =>
    item.roles.includes(role || "")
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-30 h-full glass-strong border-r border-white/5 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      } hidden lg:flex flex-col`}
    >
      {/* Logo */}

      <div className="h-16 flex items-center gap-3 px-5 border-b border-white/5">

        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-glow">

          <Activity
            size={20}
            className="text-white"
          />

        </div>

        {!collapsed && (

          <div className="overflow-hidden">

            <h1 className="font-display font-bold text-white text-lg">

              MatchDay

            </h1>

            <p className="text-xs text-primary-400">

              AI Operations

            </p>

          </div>

        )}

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">

        {navItems.map((item) => (

          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary-500/15 text-primary-400 border border-primary-500/20"
                  : "text-navy-300 hover:bg-white/5 hover:text-white border border-transparent"
              }`
            }
          >

            <item.icon
              size={20}
              className="flex-shrink-0"
            />

            {!collapsed && (
              <span>{t(item.key)}</span>
            )}

          </NavLink>

        ))}

      </nav>

      {/* Bottom */}

      <div className="px-3 py-4 border-t border-white/5 space-y-1">

        {footerItems.map((item) => (

          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary-500/15 text-primary-400"
                  : "text-navy-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >

            <item.icon
              size={20}
              className="flex-shrink-0"
            />

            {!collapsed && (
              <span>{t(item.key)}</span>
            )}

          </NavLink>

        ))}

      </div>

    </aside>
  );
}