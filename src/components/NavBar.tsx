import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  History,
  TrendingUp,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    name: "Entrenamientos",
    path: "/workout-history",
    icon: <History className="h-4 w-4" />,
  },
  {
    name: "Progressive Overload",
    path: "/progressive-overload",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    name: "Chatbot Insights",
    path: "/chatbot-insights",
    icon: <MessageSquare className="h-4 w-4" />,
  },
];

const NavBar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-2",
                location.pathname === item.path &&
                  "bg-accent text-accent-foreground"
              )}
            >
              {item.icon}
              {item.name}
            </Button>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border/50 z-50 py-2 px-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start gap-2",
                    location.pathname === item.path &&
                      "bg-accent text-accent-foreground"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
