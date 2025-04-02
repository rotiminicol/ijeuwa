import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart, FaRegBell } from "react-icons/fa6";
import { useState, useEffect } from "react";

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const [animateHeader, setAnimateHeader] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  // Animate header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setAnimateHeader(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notifications", {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Notifications cleared successfully", {
        style: {
          background: '#0f0f0f',
          color: '#c084fc',
          border: '1px solid #8b5cf6',
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
        },
        iconTheme: {
          primary: '#a855f7',
          secondary: '#0f0f0f',
        },
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          background: '#0f0f0f',
          color: '#ef4444',
          border: '1px solid #ef4444',
          boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
        },
        duration: 3000,
      });
    },
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14
      }
    },
    exit: { 
      opacity: 0, 
      x: -30,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      backgroundColor: 'rgba(139, 92, 246, 0.08)',
      boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)',
      transition: { duration: 0.3 }
    },
    selected: {
      scale: 1.03,
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      boxShadow: '0 8px 25px rgba(139, 92, 246, 0.25)',
      y: -5,
      transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 20 }
    }
  };

  const headerVariants = {
    initial: { 
      backdropFilter: "blur(5px)",
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    scrolled: { 
      backdropFilter: "blur(12px)",
      backgroundColor: "rgba(10, 10, 10, 0.85)", 
      boxShadow: "0 4px 25px rgba(139, 92, 246, 0.2)",
      transition: { duration: 0.4 }
    }
  };

  const notificationIconVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.15, 1],
      color: ["#c084fc", "#8b5cf6", "#c084fc"],
      transition: { 
        repeat: Infinity, 
        repeatDelay: 4,
        duration: 1.5 
      }
    }
  };

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-800/60 min-h-screen bg-gradient-to-b from-black to-gray-900 w-full max-w-full overflow-hidden">
      {/* Decorative elements - simplified for mobile */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-64 h-64 md:w-96 md:h-96 rounded-full bg-purple-900/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-52 h-52 md:w-80 md:h-80 rounded-full bg-purple-800/10 blur-3xl"></div>
        <motion.div 
          className="absolute top-1/4 right-1/3 w-32 h-32 md:w-64 md:h-64 rounded-full bg-purple-600/5 blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-indigo-600/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5
          }}
        />
      </div>
  
      {/* Header - made responsive */}
      <motion.div 
        className="flex justify-between items-center p-3 md:p-4 border-b border-gray-800/70 sticky top-0 z-10 backdrop-blur-sm bg-black/40"
        variants={headerVariants}
        initial="initial"
        animate={animateHeader ? "scrolled" : "initial"}
      >
        <motion.div 
          className="flex items-center gap-2 md:gap-3 text-purple-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            variants={notificationIconVariants}
            initial="initial"
            animate="pulse"
            className="text-purple-400"
          >
            <IoNotificationsOutline className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
          <motion.p 
            className="font-bold text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            Notifications
          </motion.p>
        </motion.div>
        
        <div className="dropdown dropdown-end">
          <motion.div 
            tabIndex={0} 
            role="button" 
            className="m-1 text-gray-400 hover:text-purple-500 transition-colors duration-300"
            whileHover={{ rotate: 180, transition: { duration: 0.5 } }}
            whileTap={{ scale: 0.9 }}
          >
            <IoSettingsOutline className="w-5 h-5" />
          </motion.div>
          <motion.ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow-lg shadow-purple-900/20 bg-gray-900 rounded-xl w-48 md:w-56 border border-purple-900/50 right-0"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <li>
              <motion.a 
                onClick={deleteNotifications}
                className="hover:bg-purple-900/30 hover:text-purple-300 text-gray-300 transition-all duration-200 rounded-lg font-medium text-sm md:text-base"
                whileHover={{ x: 5, backgroundColor: "rgba(139, 92, 246, 0.15)" }}
              >
                Clear all notifications
              </motion.a>
            </li>
          </motion.ul>
        </div>
      </motion.div>
  
      {/* Loading state - responsive */}
      {isLoading && (
        <motion.div 
          className="flex flex-col justify-center items-center h-48 md:h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <LoadingSpinner size="lg" color="purple" />
          </motion.div>
          <motion.p 
            className="mt-4 text-purple-300 font-medium text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Loading your updates...
            </motion.span>
          </motion.p>
        </motion.div>
      )}
  
      {/* Empty state - responsive */}
      {notifications?.length === 0 && !isLoading && (
        <motion.div 
          className="text-center p-6 md:p-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <motion.div 
            className="inline-block relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="relative text-4xl md:text-5xl mb-4 md:mb-5 p-4 md:p-6 bg-purple-900/30 rounded-full border border-purple-700/30"
              animate={{
                rotate: [0, 15, -15, 0],
                y: [0, -15, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  color: ["#c084fc", "#8b5cf6", "#c084fc"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <FaRegBell className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="font-bold text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            No notifications yet
          </motion.p>
          <motion.p 
            className="text-gray-400 text-sm md:text-base max-w-xs mx-auto px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            When you get notifications, theyll appear here with sleek animations
          </motion.p>
          <motion.div
            className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-500/10 via-purple-500/40 to-purple-500/10 rounded-full mx-auto mt-6 md:mt-8"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.div>
      )}
  
      {/* Notifications list - responsive */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-gray-800/30 px-2 py-1 md:py-2"
      >
        <AnimatePresence mode="popLayout">
          {notifications?.map((notification) => (
            <motion.div
              key={notification._id}
              variants={item}
              initial="hidden"
              animate={selectedNotification === notification._id ? "selected" : "show"}
              exit="exit"
              whileHover="hover"
              onClick={() => setSelectedNotification(
                selectedNotification === notification._id ? null : notification._id
              )}
              className="p-3 md:p-4 my-1 md:my-2 rounded-xl backdrop-blur-sm cursor-pointer border border-transparent hover:border-purple-900/30 transition-all"
            >
              <div className="flex gap-2 md:gap-4 items-start">
                <motion.div 
                  className="p-2 md:p-3 rounded-full bg-gradient-to-br from-purple-800/40 to-purple-600/20 backdrop-blur-sm border border-purple-700/30"
                  whileHover={{ 
                    scale: 1.15, 
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                    backgroundColor: "rgba(139, 92, 246, 0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {notification.type === "follow" && (
                    <FaUser className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                  )}
                  {notification.type === "like" && (
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        color: ["#a855f7", "#c084fc", "#a855f7"]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <FaHeart className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                    </motion.div>
                  )}
                </motion.div>
                
                <Link 
                  to={`/profile/${notification.from.username}`}
                  className="flex-1 min-w-0" /* prevent overflow */
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div 
                    className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="avatar">
                      <motion.div 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-purple-500/70 overflow-hidden"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.img 
                          src={notification.from.profileImg || "/avatar-placeholder.png"}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.div>
                    </div>
                    <motion.span 
                      className="font-bold text-sm md:text-base text-purple-300 hover:text-purple-200 transition-colors truncate"
                      whileHover={{
                        textShadow: "0 0 8px rgba(192, 132, 252, 0.5)",
                      }}
                    >
                      @{notification.from.username}
                    </motion.span>
                    
                    <motion.span
                      className="ml-auto text-xs text-gray-500 font-medium bg-gray-900/50 px-2 py-1 rounded-md border border-purple-900/20 whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                        color: "rgba(192, 132, 252, 0.8)",
                        scale: 1.05
                      }}
                    >
                      {new Date(notification.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </motion.span>
                  </motion.div>
                  
                  <motion.div className="flex items-center gap-2">
                    <motion.div 
                      className="w-1 h-4 md:h-5 bg-purple-500/50 rounded-full"
                      animate={{
                        height: selectedNotification === notification._id ? [5, 20] : 5,
                        opacity: selectedNotification === notification._id ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.p 
                      className="text-gray-300 font-medium text-sm md:text-base"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {notification.type === "follow" 
                        ? "started following you" 
                        : "liked your post"}
                    </motion.p>
                  </motion.div>
                  
                  {notification.type === "like" && (
                    <motion.div 
                      className="mt-2 md:mt-3 ml-3 md:ml-4 p-2 md:p-3 rounded-lg border border-purple-900/30 bg-purple-900/10 text-xs md:text-sm text-gray-300"
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ 
                        opacity: selectedNotification === notification._id ? 1 : 0.8, 
                        y: 0,
                        height: "auto",
                        scale: selectedNotification === notification._id ? 1.02 : 1
                      }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ 
                        backgroundColor: "rgba(139, 92, 246, 0.15)",
                        borderColor: "rgba(139, 92, 246, 0.3)"
                      }}
                    >
                      <motion.div 
                        className="overflow-hidden"
                        animate={{ height: "auto" }}
                      >
                        Post: {notification.post?.text?.substring(0, 30)}
                        {notification.post?.text?.length > 30 && "..."}
                      </motion.div>
                    </motion.div>
                  )}
                </Link>
              </div>
              
              <AnimatePresence>
                {selectedNotification === notification._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 md:mt-4 ml-10 md:ml-14 overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-wrap gap-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs md:text-sm text-purple-300 border border-purple-700/30 rounded-full bg-purple-900/20"
                      >
                        View Profile
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs md:text-sm text-gray-300 border border-gray-700/30 rounded-full bg-gray-900/30"
                      >
                        Dismiss
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NotificationPage;