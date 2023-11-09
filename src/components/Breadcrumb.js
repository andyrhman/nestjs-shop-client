import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const convertBreadcrumb = string => {
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, ' ').replace(/_/g, ' ');
};

const Breadcrumbs = ({ title }) => {
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState(null);

    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split('/');
            linkPath.shift();

            const pathArray = linkPath.map((path, i) => {
                return { breadcrumb: convertBreadcrumb(path), href: '/' + linkPath.slice(0, i + 1).join('/') };
            });

            if (title) {
                pathArray[pathArray.length - 1].breadcrumb = title;
            }

            setBreadcrumbs(pathArray);
        }
    }, [router, title]);

    if (!breadcrumbs) {
        return null;
    }

    return (
        <nav className="flex">
            <ol role="list" className="flex items-center">
                <li className="text-left">
                    <div className="-m-1">
                        <Link href="/" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                            Home
                        </Link>
                    </div>
                </li>
                {breadcrumbs.map((breadcrumb, i) => {
                    return (
                        <li className="text-left" key={breadcrumb.href}>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <div className='-m-1'>
                                    <Link
                                        className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                        href={breadcrumb.href}
                                    >
                                        {breadcrumb.breadcrumb}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
