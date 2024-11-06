// // import { getCookie } from "cookies-next";
// // import { useAppSelector } from "../../hooks";
// // import { useCurrentUser } from "./authSlice";
// // import { useGetCurrentUserQuery } from "./authApi";

// // const authCurrentUser = () => {
// //   const currentUser = useAppSelector(useCurrentUser);
// //   const token = getCookie("token");
// //   const { data, isLoading, refetch } = useGetCurrentUserQuery({
// //     id: currentUser?._id as string,
// //   });

// //   return { data, isLoading, refetch };
// // };

// // export default authCurrentUser;

// import { useAppSelector } from "../../hooks";

// const authCurrentUser = () => {
//   const user = useAppSelector((state) => state?.auth);

//   return user;
// };

// export default authCurrentUser;
