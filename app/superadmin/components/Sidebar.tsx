"use client";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChartBarIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";
import LogoutButton from "@/app/(auth)/route/logout";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MySidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const activeBg = "#d1d5dc";

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        backgroundColor="#fff"
        rootStyles={{
          color: "#1e2939",
          height: "100vh",
        }}
        className="shadow-gray-500 shadow-xl z-40 y-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between py-6 mr-3">
            <div className="flex items-center gap-3">
              {!collapsed && (
                <p className="font-medium text-md mx-8 transition-all">
                  Admin Page
                </p>
              )}
            </div>

            {/* Tombol toggle */}
            <div
              className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronDoubleRightIcon className="h-6 w-6 text-cyan-800" />
              ) : (
                <ChevronDoubleLeftIcon className="h-6 w-6 text-cyan-800" />
              )}
            </div>
          </div>

          {/* Menu Utama */}
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? activeBg : undefined,
                "&:hover": { backgroundColor: activeBg },
              }),
            }}
          >
            <MenuItem
              component={<Link href="/superadmin/dashboard" />}
              icon={<HomeModernIcon className="h-5 w-5 text-cyan-600" />}
              active={pathname === "/superadmin/dashboard"}
            >
              Dashboard
            </MenuItem>

            <SubMenu
              label="Master"
              style={{
                backgroundColor: "#fff",
              }}
              icon={<ChartBarIcon className="h-5 w-5 text-cyan-600" />}
            >
              <MenuItem
                component={<Link href="/superadmin/master/guru" />}
                active={pathname === "/superadmin/master/guru"}
              >
                Data Guru
              </MenuItem>
              <MenuItem
                component={<Link href="/superadmin/master/siswa" />}
                active={pathname === "/superadmin/master/siswa"}
              >
                Data Siswa
              </MenuItem>
              <MenuItem
                component={<Link href="/superadmin/master/kelas" />}
                active={pathname === "/superadmin/master/kelas"}
              >
                Data Kelas
              </MenuItem>
              <MenuItem
                component={<Link href="/superadmin/master/mapel" />}
                active={pathname === "/superadmin/master/mapel"}
              >
                Data Mapel
              </MenuItem>
              <MenuItem
                component={<Link href="/superadmin/master/sekolah" />}
                active={pathname === "/superadmin/master/sekolah"}
              >
                Data Sekolah
              </MenuItem>
            </SubMenu>
          </Menu>

          {/* Extra */}
          <div className="px-4 py-4 text-sm font-semibold opacity-70 mt-auto">
            {!collapsed && "Extra"}
          </div>
          <Menu>
            <LogoutButton />
          </Menu>
          <Menu>
            <MenuItem disabled>
              <p className="text-sm">Copyright &copy; Fadhlmlnaa</p>
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
}
