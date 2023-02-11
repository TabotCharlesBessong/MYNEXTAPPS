import React from 'react';
import {StoreProvider} from '../utils/Store'
import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import { useRouter } from 'next/router';
import {useSession} from 'next-auth/react'
 
function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return (
    <StoreProvider>
      <SessionProvider session={session} >
        {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
      </SessionProvider>
    </StoreProvider>
  );
}

function Auth({ children, adminOnly }) {
	const router = useRouter();
	const { status, data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/unauthorized?message=login required");
		},
	});
	if (status === "loading") {
		return <div>Loading...</div>;
	}
	if (adminOnly && !session.user.isAdmin) {
		router.push("/unauthorized?message=admin login required");
	}

	return children;
} 
export default MyApp;
