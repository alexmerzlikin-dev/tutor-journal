import { PropsWithChildren } from "react";

import NextAuthProvider from "./NextAuthProvider";
import GuestProvider from "./GuestProvider";
import InitLoadingData from "./InitLoadingData";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextAuthProvider>
      <GuestProvider>
        <InitLoadingData>{children}</InitLoadingData>
      </GuestProvider>
    </NextAuthProvider>
  );
};

export default Providers;
