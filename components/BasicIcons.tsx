import React from 'react'
import {
    LuBuilding2,   // Company 🏢
    LuUsers,       // CompanyMembership 👥
    LuFolderKanban, // Project 📁
    LuListTodo,
    LuBatteryLow,
    LuBatteryFull, // Task ✅
} from "react-icons/lu"
import { LuFolderPlus } from "react-icons/lu";
import { LuLayoutGrid } from "react-icons/lu";
import { LuLayoutList } from "react-icons/lu";
import { LuFileInput } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { LuBatteryMedium } from "react-icons/lu";

import {
    HiOutlineCollection, // department

} from "react-icons/hi"

import { LuCog } from "react-icons/lu";
import { LuCheckCheck } from "react-icons/lu";
import { LuCircleAlert } from "react-icons/lu";
import { LuCircleMinus } from "react-icons/lu";
import { LuInfo } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";

import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";

import { LuClock3 } from "react-icons/lu";

import { LuTrash2 } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { LuSendHorizontal } from "react-icons/lu";
import { RiUserReceived2Line } from "react-icons/ri";
import { FaCrown } from "react-icons/fa";
import { FiShield, FiUser, FiEye } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuArrowRight } from "react-icons/lu";
import { LuPanelLeftOpen } from "react-icons/lu";
import { LuGrid2X2Plus } from "react-icons/lu";
import { LuPaperclip } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa6";
import { LuImage } from "react-icons/lu";
import { LuFileType } from "react-icons/lu";
import { TbFileTypeDocx } from "react-icons/tb";
import { PiMicrosoftWordLogo } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { TbUsersGroup } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";
import { TiUserAdd } from "react-icons/ti";



const labelAndIcons = {
    company: LuBuilding2,
    companyMembership: LuUsers,
    department: HiOutlineCollection,
    project: LuFolderKanban,
    task: LuListTodo,
    addProject: LuFolderPlus,
    gridView: LuLayoutGrid,
    listView: LuLayoutList,
    assignee: LuFileInput,
    calender: LuCalendarDays,
    arrowDown: MdKeyboardArrowDown,
    plus: FiPlus,
    normal: LuBatteryMedium,
    low: LuBatteryLow,
    high: LuBatteryFull,
    TODO: LuCircleAlert,
    IN_PROGRESS: LuCog,
    DONE: LuCheckCheck,
    BLOCKED: LuCircleMinus,
    info: LuInfo,
    textFile : LuFileText,
    edit: LuPencil,
    emptyCheckbox: MdOutlineCheckBoxOutlineBlank,
    filledCheckbox: IoMdCheckbox,
    clock: LuClock3,
    trash: LuTrash2,
    search: LuSearch,
    send:LuSendHorizontal,
    joinReq: RiUserReceived2Line,
    owner: FaCrown,
    admin: FiShield,
    manager: HiOutlineUserGroup,
    member: FiUser,
    guest: FiUser,
    arrowRight: LuArrowRight,
    sidebar: LuPanelLeftOpen,
    addDepartment: LuGrid2X2Plus,
    attachment: LuPaperclip,
    // attachment file icons --starts
    pdf: FaFilePdf,
    img: LuImage,
    txt: LuFileType,
    docx: TbFileTypeDocx,
    doc: PiMicrosoftWordLogo,
    // attachment file icons --ends
    users: TbUsersGroup,
    settings: IoSettingsOutline,
    options: TbDotsVertical,
    addUser: TiUserAdd,
    


}

type PropType = {
    label: keyof typeof labelAndIcons,
    size?: string,
    spin?: boolean,
    pulse?: boolean,
    showFullLog?: boolean;
}
const BasicIcons = ({ label, size = 'text-xl', spin = false, pulse = false, showFullLog = false }: PropType) => {

    const Icon = labelAndIcons[label]
    return showFullLog
        ? (
            <div className="grid grid-cols-4 gap-4">
                {Object.entries(labelAndIcons).map(([label, Icon]) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                        <Icon className="text-2xl" />
                        <span className="text-xs">{label}</span>
                    </div>
                ))}
            </div>
        )
        : (
            <div className='flex flex-row gap-2 items-center'>
                <Icon className={`${size} ${spin && 'animate-spin'} ${pulse && 'animate-pulse'} `} />
                {/* <p>{label} </p> */}
            </div>
        )
}

export default BasicIcons
