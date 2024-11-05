import {create} from "zustand";

//create the hook
//global state
export const useStickerStore = create((set) => ({
    stickers: [ ],
    //setter function
    setStickers: (stickers) => set({stickers}),


    //POST method - create a new sticker
    createSticker: async (newSticker) => {
        if(!newSticker.name || !newSticker.price || !newSticker.image) {
            return {success:false, message: "Please fill in all fields"}
        }
        const res = await fetch("/api/stickers", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newSticker),
        })
        const data = await res.json();
        set((state) => ({stickers:[...state.stickers, data.data]}))
        return {success: true, message: "Sticker created successfully!"}
    },

    //GET all the stickers in the database and display them
    fetchStickers: async () => {
        const res = await fetch("/api/stickers");
        const data = await res.json();
        set({stickers: data.data});
    },

    //DELETE sticker containing specified pid
    //use backticks (`) because we are using template literals (${expression})
    deleteSticker: async (pid) => {
        const res = await fetch(`/api/stickers/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return{success:false, message: data.message};

        //This set state function is what is constantly updating the UI
        set(state => ({stickers: state.stickers.filter(sticker => sticker._id !== pid)}));

        return {success:true, message:data.message};
    },

    //PUT function
    updateSticker: async (pid, updatedSticker) => {
        const res = await fetch(`/api/stickers/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updatedSticker),
        });
        const data = await res.json();
        if (!data.success) return {success:false, message:data.message};

        //we updated the state of the UI automatically without needing a refresh
        set((state) => ({
            stickers: state.stickers.map((sticker) => sticker._id === pid ? data.data : sticker)
        }))

        return {success:true, message:data.message};
    }
}));