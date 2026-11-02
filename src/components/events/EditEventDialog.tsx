import { IEventType } from "@/type/type";
import { Edit3 } from "lucide-react";

interface EditEventDialogProps {
    event: IEventType;
}

const EditEventDialog = ({ event }: EditEventDialogProps) => {
    return (
        <div>
            <div
                className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-brand-orange/40 hover:bg-orange-50 hover:text-[#e86e00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7900] focus-visible:ring-offset-2 sm:text-sm"
            >
                <Edit3 className="h-4 w-4 shrink-0" />
                <span>Edit</span>
            </div>
        </div>
    );
};

export default EditEventDialog;