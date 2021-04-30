import { motion } from "framer-motion";
import moment from "moment";
import React from "react";
import { useTask } from "../contexts/useTask";

const TaskCardDetails = () => {
    const { setIsSelectedTask, selectedTask, setSelectedTask } = useTask();

    const divVar = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
        removed: {
            opacity: 0,
        },
    };

    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md">
            <div
                onClick={() => {
                    setIsSelectedTask(false);
                    setSelectedTask({});
                }}
                className="w-full h-full bg-black opacity-50"
            />
            <motion.div
                initial="hidden"
                animate="visible"
                exit="removed"
                variants={divVar}
                className="absolute max-w-50 max-h-80screen shadow-mat flex flex-col bg-gray-200 p-4 rounded-md"
            >
                <div className="flex flex-col my-2">
                    <label htmlFor="title">Titel</label>
                    <div className="rounded-md p-2 shadow-md bg-white">
                        {selectedTask.title}
                    </div>
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="description">Beschrijving</label>
                    <div className="overflow-y-scroll rounded-md bg-white p-2 shadow-md">
                        {selectedTask.description}
                    </div>
                </div>

                <span className="block text-gray-500">
                    {moment(selectedTask.date)
                        .locale("nl-be")
                        .format("dddd DD/MM/YYYY") +
                        ", " +
                        moment(selectedTask.date + " " + selectedTask.time)
                            .locale("nl-be")
                            .format("LT")}
                </span>
            </motion.div>
        </div>
    );
};

export default TaskCardDetails;
