import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 视频 video 模块
const formRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "视频处理"
		},
		children: [
			{
				path: "/video/info",
				element: lazyLoad(React.lazy(() => import("@/views/video/info/index"))),
				meta: {
					requiresAuth: true,
					title: "视频信息",
					key: "basicVideoForm"
				}
			},
		]
	}
];

export default formRouter;
