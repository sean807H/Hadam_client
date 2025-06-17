import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./nav.module.css";
import { icon } from "./icon";

const navItems = [
  { path: "/write", label: "Write", icon: "diary" },
  { path: "/community", label: "Commu", icon: "community" },
  { path: "/", label: "Home", icon: "home" },
  { path: "/calendar", label: "Calendar", icon: "calendar" },
  { path: "/my", label: "My", icon: "my" },
];

function Nav() {
  const location = useLocation();

  return (
    <nav className={style.nav}>
      {navItems.map(({ path, label, icon: iconName }) => {
        const isActive = location.pathname === path;
        const Icon = isActive ? icon[iconName].selected : icon[iconName].default;

        return (
          <Link to={path} key={path} style={{ textDecoration: "none" }}>
            <div className={`${style.navItem} ${isActive ? style.active : ""}`}>
              <Icon className={style.icon} />
              <span
                className={style.label}
                style={{ color: isActive ? "#FF7F50" : "#B0B0B0" }}
              >
                {label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export default Nav;