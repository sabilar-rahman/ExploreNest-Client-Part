// "use client";

// import {
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaEnvelope,
//   FaPhone,
//   FaUserEdit,
//   FaUserCheck,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { Card, CardBody, CardHeader } from "@nextui-org/card";
// import { Avatar } from "@nextui-org/avatar";
// import { Divider } from "@nextui-org/divider";
// import { Button } from "@nextui-org/button";
// import { format } from "date-fns";
// import Link from "next/link";
// import { Badge } from "@nextui-org/badge";
// import { CheckIcon } from "lucide-react";
// import { useDisclosure } from "@nextui-org/modal";

// import Loading from "@/src/components/Loading";
// import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
// // import FollowingModal from "@/src/components/modal/FollowingModal";
// // import FollowerModal from "@/src/components/modal/FollowerModal";

// const ProfilePage = () => {
//   const {
//     isOpen: followersModalIsOpen,
//     onOpen: followersModalOnOpen,
//     onClose: followersModalOnClose,
//   } = useDisclosure();

//   const {
//     isOpen: followingModalIsOpen,
//     onOpen: followingModalOnOpen,
//     onClose: followingModalOnClose,
//   } = useDisclosure();

//   const { data: userData, isLoading: userLoading } =
//     useGetCurrentUserQuery({});

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       {userLoading && <Loading />}
//       <motion.div
//         animate={{ opacity: 1, y: 0 }}
//         initial={{ opacity: 0, y: 20 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card className="bg-background shadow-lg overflow-hidden">
//           <CardHeader className="relative p-0 mb-4">
//             <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600" />
//             <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-3/4 w-32 h-32">
//               <Badge
//                 isOneChar
//                 className={`${!userData?.data?.isVerified ? "hidden" : ""}`}
//                 color="success"
//                 content={<CheckIcon />}
//                 placement="bottom-right"
//                 shape="circle"
//               >
//                 <Avatar
//                   isBordered
//                   className="w-32 h-32"
//                   color="primary"
//                   src={userData?.data?.profileImage}
//                 />
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardBody className="px-4 pb-8">
//             <div className="text-center mb-6">
//               <h1 className="text-3xl font-bold mb-2">
//                 {userData?.data?.name}
//               </h1>
//               <p className="text-default-500 mb-4">
//                 {userData?.data?.bio
//                   ? userData?.data?.bio
//                   : "Bio not provided"}
//               </p>
//               <div className="flex items-center justify-center">
//                 <FaMapMarkerAlt className="text-primary mr-2" />
//                 <span className="text-default-500">
//                   {" "}
//                   {userData?.data?.address
//                     ? userData?.data?.address
//                     : "Address not provided"}
//                 </span>
//               </div>
//             </div>

//             <Divider className="my-6" />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <FaEnvelope className="text-primary mr-3" />
//                   <div>
//                     <p className="text-sm text-default-500">Email</p>
//                     <p className="font-medium">
//                       {userData?.data?.email}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <FaPhone className="text-primary mr-3" />
//                   <div>
//                     <p className="text-sm text-default-500">Phone</p>
//                     <p className="font-medium">
//                       {userData?.data?.mobileNumber}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <FaCalendarAlt className="text-primary mr-3" />
//                   <div>
//                     <p className="text-sm text-default-500">Birthday</p>
//                     <p className="font-medium">
//                       {userData?.data?.birthDate}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <Button
//                   color="default"
//                   style={{
//                     justifyContent: "space-between",
//                     display: "flex",
//                     width: "100%",
//                     padding: "16px",
//                     borderRadius: "10px",
//                   }}
//                   onPress={followersModalOnOpen}
//                 >
//                   <span className="font-medium">Followers</span>
//                   <span className="text-primary font-bold">
//                     {userData?.data?.followers?.length}
//                   </span>
//                 </Button>

//                 <Button
//                   color="default"
//                   style={{
//                     justifyContent: "space-between",
//                     display: "flex",
//                     width: "100%",
//                     padding: "16px",
//                     borderRadius: "10px",
//                   }}
//                   onPress={followingModalOnOpen}
//                 >
//                   <span className="font-medium">Following</span>
//                   <span className="text-primary font-bold">
//                     {userData?.data?.following?.length}
//                   </span>
//                 </Button>
//                 <div className="flex justify-between items-center p-3 bg-default-100 rounded-lg">
//                   <span className="font-medium">Member since</span>
//                   {userData?.data?.createdAt && (
//                     <span className="text-primary font-bold">
//                       {" "}
//                       {format(
//                         new Date(userData?.data?.createdAt),
//                         "MMM dd, yyyy",
//                       )}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Divider className="my-6" />

//             <div className="flex justify-center space-x-4">
//               <Link href={`/dashboard/edit-profile`}>
//                 <Button color="primary" startContent={<FaUserEdit />}>
//                   Edit Profile
//                 </Button>
//               </Link>
//               {!userData?.data?.isVerified && (
//                 <Link href={`/subscription`}>
//                   <Button
//                     color="primary"
//                     startContent={<FaUserCheck />}
//                     variant="bordered"
//                   >
//                     Verify Profile
//                   </Button>
//                 </Link>
//               )}
//             </div>
//           </CardBody>
//         </Card>
//       </motion.div>

//       {/* <FollowerModal
//         isOpen={followersModalIsOpen}
//         onClose={followersModalOnClose}
//       />
//       <FollowingModal
//         isOpen={followingModalIsOpen}
//         onClose={followingModalOnClose}
//       /> */}
//     </div>
//   );
// };

// export default ProfilePage;

"use client";

import { FaEnvelope, FaUserEdit, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";
import { useDisclosure } from "@nextui-org/modal";

import Loading from "@/src/components/Loading";
import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
import { GoVerified } from "react-icons/go";

const MyProfile = () => {
  const {
    isOpen: followersModalIsOpen,
    onOpen: followersModalOnOpen,
    onClose: followersModalOnClose,
  } = useDisclosure();

  const {
    isOpen: followingModalIsOpen,
    onOpen: followingModalOnOpen,
    onClose: followingModalOnClose,
  } = useDisclosure();

  const { data: userData, isLoading: userLoading } = useGetCurrentUserQuery({});

  return (
    <div className="container mx-auto px-2 py-2 ">
      {userLoading && <Loading />}

      <Card className="bg-background shadow-lg overflow-hidden">
        <h1 className="text-2xl text-center font-bold ">Profile Information</h1>
        <CardHeader className="relative p-0 ">
          <div className="w-full h-48 bg-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge
              isOneChar
              className={`${!userData?.data?.isVerified ? "hidden" : ""}`}
              content={<GoVerified />}
              placement="top-right"
              shape="circle"
              size="lg"
              color="danger"
            >
              <Avatar
                isBordered
                className="w-48 h-32"
                radius="sm"
                src={userData?.data?.profileImage}
              />
            </Badge>
          </div>
        </CardHeader>
        <CardBody className="px-4 pb-3">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold mb-2">{userData?.data?.name}</h1>

            {!userData?.data?.isVerified && (
              <Link href={`/subscription`}>
                <Button startContent={<GoVerified />} variant="bordered">
                  Verify Profile
                </Button>
              </Link>
            )}

            <div className="flex items-center justify-center py-2 ">
              <FaEnvelope className=" mr-2" />
              <p className="font-medium">{userData?.data?.email}</p>
            </div>
          </div>

          

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
            <Button
              color="default"
              // style={{
              //   justifyContent: "space-around",
              //   display: "flex",
              //   width: "100%",
              //   padding: "16px",
              //   borderRadius: "10px",
              // }}
              onPress={followersModalOnOpen}
              variant="bordered"
            >
              <span className="font-medium">Followers :</span>
              <span className=" font-bold">
                {userData?.data?.followers?.length}
              </span>
            </Button>

            <Button
              color="default"
              // style={{
              //   justifyContent: "space-between",
              //   display: "flex",
              //   width: "100%",
              //   padding: "16px",
              //   borderRadius: "10px",
              // }}
              onPress={followingModalOnOpen}
              variant="bordered"
            >
              <span className="font-medium">Following :</span>
              <span className="font-bold">
                {userData?.data?.following?.length}
              </span>
            </Button>
          </div>

         

          <div className="flex justify-center space-x-4 mt-4">
            <Link href={`/dashboard/edit-profile`}>
              <Button>Edit Profile</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyProfile;
