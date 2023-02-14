import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import {useState, useEffect, useContext} from 'react'
import { Menu } from "@headlessui/react";
import { DropdownLink } from "../components";
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';


export default function Loading() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  }, [])
	const {status,data:session} = useSession()
	const {  dispatch } = useContext(Store);

	const logoutClickHandler = () => {
		Cookies.remove("cart");
		dispatch({ type: "CART_RESET" });
		signOut({ callbackUrl: "/login" });
	};
  return (
		mounted && (
			<div className="pt-2">
				{status === "loading" ? (
					"Loading"
				) : session?.user ? (
					<Menu as="div" className="relative inline-block">
						<Menu.Button className="text-blue-600">
							{session.user.name}
						</Menu.Button>
						<Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
							<Menu.Item>
								<DropdownLink className="dropdown-link" href="/profile">
									Profile
								</DropdownLink>
							</Menu.Item>
							<Menu.Item>
								<DropdownLink className="dropdown-link" href="/orderHistory">
									Order History
								</DropdownLink>
							</Menu.Item>
							{session.user.isAdmin && (
								<Menu.Item>
									<DropdownLink
										className="dropdown-link"
										href="/admin/dashboard"
									>
										Admin Dashboard
									</DropdownLink>
								</Menu.Item>
							)}
							<Menu.Item>
								<span
									className="dropdown-link"
									style={{cursor:'pointer'}}
									// href="#"
									onClick={logoutClickHandler}
								>
									Logout
								</span>
							</Menu.Item>
						</Menu.Items>
					</Menu>
				) : (
					<Link suppressHydrationWarning={true} href="/login" className="p-2">
						Login
					</Link>
				)}
			</div>
		)
	);
 }