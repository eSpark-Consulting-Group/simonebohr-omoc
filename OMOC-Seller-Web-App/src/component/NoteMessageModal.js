import React from "react";
import { strings } from "../utils/strings";

function NoteMessageModal() {
    return(
        <section className="w-52 rounded-xl bg-white absolute bottom-8 right-6">
            <div className="p-6">
                <h1 className="text-sm font-medium mb-2">{strings.SHOP_TIPS}</h1>
                <p className="text-xs text-slate-400 font-medium">{strings.SHOP_TIPS_MESSAGE_1}</p>
                <p className="text-xs text-slate-400 font-medium">{strings.SHOP_TIPS_MESSAGE_2}</p>
                <p className="text-xs text-slate-400 font-medium">{strings.SHOP_TIPS_MESSAGE_3}</p>
            </div>
        </section>
    )
}


export default NoteMessageModal;