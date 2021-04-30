import React from "react";
import TopBar from "./navigation/TopBar";
import BottomBar from "./navigation/BottomBar";
import { useAuth } from "../contexts/useAuth";
import LogoutModal from "./LogoutModal";
import { AnimatePresence } from "framer-motion";

export const Layout = ({ children }) => {
    const { isLogout } = useAuth();
    return (
        <div className="flex flex-col items-center w-full h-screen sm:h-auto">
            <TopBar />

            <div className="flex-grow overflow-y-scroll sm:mt-16 w-full py-8">
                {children}
            </div>

            <BottomBar />
            <AnimatePresence>{isLogout && <LogoutModal />}</AnimatePresence>
        </div>
    );
};
