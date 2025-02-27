"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";

function ConvexClientProvider({children}){
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL); //tu sinh ra convex deploy o env
    return(
        <ConvexProvider client={convex}>{children}</ConvexProvider>
    )
}

export default ConvexClientProvider