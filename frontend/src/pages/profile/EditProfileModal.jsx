import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import { X, User, Lock, Mail, Link as LinkIcon, Edit3 } from "react-feather";

const EditProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsOpen(false);
  };

  // Animation variants
  const inputVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 * custom, type: "spring", stiffness: 150 }
    })
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#1A2B1E" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-full border border-green-400 text-green-400 bg-black hover:text-white transition-colors duration-300 flex items-center"
      >
        <Edit3 size={16} className="mr-2" />
        Edit profile
      </motion.button>
  
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.dialog
              open
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-black rounded-xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-green-500 sm:max-h-[90vh] max-h-[95vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6 sm:mb-8 sticky top-0 bg-black pb-2 z-10">
                  <motion.h3 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent"
                  >
                    Update Profile
                  </motion.h3>
                  <motion.button
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsOpen(false)}
                    className="text-purple-400 hover:text-green-400 transition-colors p-1"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
  
                <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                  <motion.div
                    custom={1}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-green-500 focus-within:border-green-400 transition-all duration-300"
                  >
                    <User className="text-purple-500 group-hover:text-green-400 group-focus-within:text-green-400 transition-colors duration-300" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.fullName}
                      name="fullName"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    custom={2}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-green-500 focus-within:border-green-400 transition-all duration-300"
                  >
                    <User className="text-purple-500 group-hover:text-green-400 group-focus-within:text-green-400 transition-colors duration-300" size={18} />
                    <input
                      type="text"
                      placeholder="Username"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.username}
                      name="username"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    custom={3}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-green-500 focus-within:border-green-400 transition-all duration-300"
                  >
                    <Mail className="text-purple-500 group-hover:text-green-400 group-focus-within:text-green-400 transition-colors duration-300" size={18} />
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    custom={4}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-green-500 focus-within:border-green-400 transition-all duration-300"
                  >
                    <Edit3 className="text-purple-500 group-hover:text-green-400 group-focus-within:text-green-400 transition-colors duration-300 mt-1" size={18} />
                    <textarea
                      placeholder="Bio"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 min-h-[80px] resize-none"
                      value={formData.bio}
                      name="bio"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    custom={5}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-green-500 focus-within:border-green-400 transition-all duration-300"
                  >
                    <LinkIcon className="text-purple-500 group-hover:text-green-400 group-focus-within:text-green-400 transition-colors duration-300" size={18} />
                    <input
                      type="text"
                      placeholder="Website Link"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.link}
                      name="link"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    custom={6}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-green-500 focus-within:border-green-400 transition-all duration-300"
                  >
                    <Lock className="text-purple-500 group-hover:text-green-400 group-focus-within:text-green-400 transition-colors duration-300" size={18} />
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.currentPassword}
                      name="currentPassword"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    custom={7}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-green-500 focus-within:border-green-400 transition-all duration-300"
                  >
                    <Lock className="text-purple-500 group-hover:text-green-400 group-focus-within:text-green-400 transition-colors duration-300" size={18} />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.newPassword}
                      name="newPassword"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-4 sm:pt-6 sticky bottom-0 bg-black pb-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="w-full relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-green-500 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-green-500 to-purple-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                      <span className="relative block bg-black bg-opacity-50 text-white py-3 rounded-lg font-medium transform group-hover:bg-opacity-30 transition-all duration-300">
                        {isUpdatingProfile ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </span>
                        ) : (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center"
                          >
                            Update Profile
                          </motion.span>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditProfileModal;