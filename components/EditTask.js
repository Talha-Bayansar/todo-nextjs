import React from "react";

export const EditTask = ({
    setEdit,
    title,
    setTitle,
    description,
    setDescription,
    taskId,
    setTaskId,
    time,
    setTime,
    date,
    setDate,
}) => {
    const handleSubmit = async () => {
        console.log("edited");
        if (title !== "" && description !== "") {
            console.log("EDIT TASK");
            setTitle("");
            setDescription("");
            setTaskId(null);
            setEdit(false);
        }
    };
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md">
            <div
                onClick={() => setEdit(false)}
                className="w-full h-full bg-black opacity-50"
            />
            <form
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
                className="animate-grow absolute shadow-mat flex flex-col bg-gray-200 p-4 rounded-md"
            >
                <div className="flex flex-col my-2">
                    <label htmlFor="title">Titel</label>
                    <input
                        className="focus:outline-none rounded-md p-2 shadow-md"
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="description">Beschrijving</label>
                    <textarea
                        className="focus:outline-none h-24 rounded-md p-2 shadow-md"
                        type="text"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div className="flex justify-between my-2">
                    <div className="flex flex-col mr-1">
                        <label htmlFor="date">Datum</label>
                        <input
                            className="focus:outline-none rounded-md p-2 shadow-md w-min"
                            type="date"
                            name="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />
                    </div>
                    <div className="flex flex-col ml-1">
                        <label htmlFor="time">Tijdstip</label>
                        <input
                            className="focus:outline-none rounded-md p-2 shadow-md w-min"
                            type="time"
                            name="time"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="focus:outline-none shadow-mat outline-none my-2 bg-white rounded-md py-2 hover:bg-green-300 transition-colors"
                >
                    Taak aanmaken
                </button>
            </form>
        </div>
    );
};
