


import { Server } from "socket.io";

let connections = new Map(); // Using Map for better performance
let messages = new Map();
let timeOnline = new Map();

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("join-call", (path) => {
            if (!connections.has(path)) {
                connections.set(path, []);
            }
            connections.get(path).push(socket.id);
            timeOnline.set(socket.id, new Date());

            // Notify other users in the room
            connections.get(path).forEach((id) => {
                io.to(id).emit("user-joined", socket.id, connections.get(path));
            });

            // Send past messages to the new user
            if (messages.has(path)) {
                messages.get(path).forEach(({ data, sender, socketIdSender }) => {
                    io.to(socket.id).emit("chat-message", data, sender, socketIdSender);
                });
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            const matchingRoom = Array.from(connections.entries()).find(([roomKey, roomValue]) =>
                roomValue.includes(socket.id)
            );

            if (matchingRoom) {
                const [room] = matchingRoom;
                if (!messages.has(room)) {
                    messages.set(room, []);
                }

                messages.get(room).push({ sender, data, socketIdSender: socket.id });
                console.log("Message in", room, ":", sender, data);

                connections.get(room).forEach((id) => {
                    io.to(id).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            const [roomKey] = Array.from(connections.entries()).find(([_, ids]) => ids.includes(socket.id)) || [null];

            if (roomKey) {
                connections.get(roomKey).forEach((id) => {
                    if (id !== socket.id) {
                        io.to(id).emit("user-left", socket.id);
                    }
                });

                // Remove the socket from the room
                connections.set(roomKey, connections.get(roomKey).filter(id => id !== socket.id));
                if (connections.get(roomKey).length === 0) {
                    connections.delete(roomKey);
                }
            }
        });
    });

    return io;
};




















































































// import { Server } from "socket.io"


// let connections = {}
// let messages = {}
// let timeOnline = {}

// export const connectToSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"],
//             allowedHeaders: ["*"],
//             credentials: true
//         }
//     });


//     io.on("connection", (socket) => {

//         console.log("SOMETHING CONNECTED")

//         socket.on("join-call", (path) => {

//             if (connections[path] === undefined) {
//                 connections[path] = []
//             }
//             connections[path].push(socket.id)

//             timeOnline[socket.id] = new Date();

//             // connections[path].forEach(elem => {
//             //     io.to(elem)
//             // })

//             for (let a = 0; a < connections[path].length; a++) {
//                 io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
//             }

//             if (messages[path] !== undefined) {
//                 for (let a = 0; a < messages[path].length; ++a) {
//                     io.to(socket.id).emit("chat-message", messages[path][a]['data'],
//                         messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
//                 }
//             }

//         })

//         socket.on("signal", (toId, message) => {
//             io.to(toId).emit("signal", socket.id, message);
//         })

//         socket.on("chat-message", (data, sender) => {

//             const [matchingRoom, found] = Object.entries(connections)
//                 .reduce(([room, isFound], [roomKey, roomValue]) => {


//                     if (!isFound && roomValue.includes(socket.id)) {
//                         return [roomKey, true];
//                     }

//                     return [room, isFound];

//                 }, ['', false]);

//             if (found === true) {
//                 if (messages[matchingRoom] === undefined) {
//                     messages[matchingRoom] = []
//                 }

//                 messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
//                 console.log("message", matchingRoom, ":", sender, data)

//                 connections[matchingRoom].forEach((elem) => {
//                     io.to(elem).emit("chat-message", data, sender, socket.id)
//                 })
//             }

//         })

//         socket.on("disconnect", () => {

//             var diffTime = Math.abs(timeOnline[socket.id] - new Date())

//             var key

//             for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

//                 for (let a = 0; a < v.length; ++a) {
//                     if (v[a] === socket.id) {
//                         key = k

//                         for (let a = 0; a < connections[key].length; ++a) {
//                             io.to(connections[key][a]).emit('user-left', socket.id)
//                         }

//                         var index = connections[key].indexOf(socket.id)

//                         connections[key].splice(index, 1)


//                         if (connections[key].length === 0) {
//                             delete connections[key]
//                         }
//                     }
//                 }

//             }


//         })


//     })


//     return io;
// }