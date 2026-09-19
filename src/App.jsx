import bgImage from './assets/background.png';
import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Bot, MapPin, Search, Users, Clock, 
  QrCode, Link as LinkIcon, Camera, X, Check, MessageSquare, ChevronLeft,
  Laptop, BookOpen, Globe, ChevronDown, UserCheck, Coffee, Bell,
  ArrowUpRight, Trash2, Plus, CheckCircle2, ShieldCheck, Mail, BookMarked, Award, School
} from 'lucide-react';

const VIETNAM_PROVINCES = [
  "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const FIELDS_OF_STUDY = [
  "Kinh tế / Quản trị Kinh doanh", "Công nghệ Thông tin / IT", "Khoa học Dữ liệu / Trí tuệ nhân tạo", "Marketing / Truyền thông", "Tài chính / Ngân hàng / Kế toán", "Thiết kế Đồ họa / UI-UX", "Kỹ thuật / Cơ khí / Điện tử", "Y tế / Chăm sóc sức khỏe", "Giáo dục / Sư phạm", "Ngoại ngữ / Biên phiên dịch", "Luật / Pháp lý", "Quản trị Nhân sự (HR)", "Logistics / Chuỗi cung ứng", "Du lịch / Nhà hàng - Khách sạn", "Nghệ thuật / Điện ảnh", "Kiến trúc / Xây dựng", "Nông nghiệp / Môi trường", "Khác"
];

const ALL_SKILLS = [
  "Leadership", "Teamwork", "Communication", "Negotiation", "Presentation", 
  "Pitching", "Storytelling", "Research", "Validation", "Strategic Thinking", 
  "Problem Solving", "Creativity", "Data Analysis", "Project Management", 
  "Agile/Scrum", "UI/UX Design", "Figma", "Python", "JavaScript", "React", 
  "Node.js", "SQL", "Business Analysis", "Digital Marketing", "SEO/SEM", "Content Writing"
];

const CAMPUSES = [
  { name: "ĐH Kinh tế - Luật (UEL - ĐHQG)", students: "420+ sinh viên đang tìm đội" },
  { name: "ĐH Bách Khoa TP.HCM (HCMUT)", students: "610+ sinh viên đang tìm đội" },
  { name: "ĐH Kinh tế Quốc dân (NEU)", students: "580+ sinh viên đang tìm đội" },
  { name: "ĐH Công nghệ TP.HCM (HUTECH)", students: "390+ sinh viên đang tìm đội" },
  { name: "ĐH Ngoại Thương (FTU)", students: "510+ sinh viên đang tìm đội" },
  { name: "ĐH Khoa học Tự nhiên (HCMUS)", students: "340+ sinh viên đang tìm đội" }
];

const TRANSLATIONS = {
  vi: {
    login: "Đăng nhập",
    joinNow: "Tham gia ngay",
    noReply: "Adam không trả lời?",
    resend: "Gửi lại thông báo",
    heroTitle1: "Bắt cặp đúng gu – Chốt team",
    heroTitle2: "học tập & dự án",
    yourSchool: "@ Trường học của bạn",
    meetTime: "Thời gian mở đợt ghép tuần này",
    sendMsgBtn: "Nhắn cho Adam để chốt team",
    terms: "Bằng cách tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật của Jobbod.",
    howItWorksBadge1: "CÁCH CHÚNG TÔI",
    howItWorksBadge2: "HOẠT ĐỘNG",
    step1Title: "Hãy cho Jobbod biết bạn thuộc nhóm tính cách nào?",
    step1Desc: "Hãy gửi yêu cầu của bạn trước 23:59 Thứ Sáu.",
    step2Title: "The Sunday Drop",
    step2Desc: "Hãy kiểm tra email của bạn lúc 7 giờ tối. Chúng tôi sẽ gửi cho bạn một người đồng đội phù hợp cá nhân hóa và sắp xếp buổi gặp cho bạn!",
    step3Title: "Lên lịch ngày",
    step3Desc: "Hãy tìm thời gian phù hợp với lịch trình của bạn để cả hai gặp nhau",
    step4Title: "Good luck!",
    step4Desc: "Hãy bắt đầu kết nối với những người bạn phù hợp với bạn trên hành trình học đường này nào!",
    companionBadge1: "NGƯỜI BẠN ĐỒNG HÀNH",
    companionBadge2: "CÁ NHÂN HÓA CỦA BẠN",
    compCol1Title: "Nền tảng đối soát tâm lý & nhận thức học đường",
    compCol1Sub: "Chuyên gia ghép cặp",
    compCol1Desc: "Thuật toán tối ưu hóa theo phương pháp khoa học",
    compCol2Title: "Adam thấu hiểu chuyên ngành, thế mạnh và phong cách làm việc của bạn.",
    compCol2Scan: "🎯 Quét DNA kỹ năng",
    compCol3Title: "Tìm kiếm bạn đồng hành có năng lực bù trừ chính xác phần bạn còn thiếu.",
    compCol3Sub: "Đối soát thông minh",
    compCol3Desc: "Đồng bộ dữ liệu thời gian thực",
    chatAiBtn: "Trò chuyện với AI ngay",
    p7Badge: "BẠN ĐÃ CHÁN TÌM CỘNG SỰ THÔNG QUA VIỆC LƯỚT FACEBOOK VÀ CÁC HỘI NHÓM MXH CHƯA?",
    p7SubBadge: "Hệ sinh thái này chính là dành cho bạn!",
    p7LeftHeader: "Trên Jobbod",
    p7LeftSub: "Lời mời gặp mặt sẵn sàng sử dụng",
    p7InviteText: "Cuộc hẹn của bạn được ấn định vào thứ Sáu. Xem chi tiết.",
    p7RightHeader: "Mạng xã hội thông thường",
    p7RightSub: "Lướt vô tận, hỏi dạo và những cuộc hội thoại rơi vào im lặng",
    p8Badge1: "ĐÃ XÁC MINH. RIÊNG TƯ.",
    p8Badge2: "AN TOÀN",
    p8Sec1Title: "Xác thực sinh viên #1",
    p8Sec1Desc: "100% tài khoản xác minh qua email trường đại học chính chủ",
    p8Sec2Title: "Riêng tư tuyệt đối #2",
    p8Sec2Desc: "Chỉ người đồng đội được ghép cặp thành công mới có thể xem hồ sơ của bạn",
    p8Sec3Title: "Không gian kết nối an toàn #3",
    p8Sec3Desc: "Gặp gỡ trực tiếp tại các quán cà phê đối tác hoặc campus trường",
    p9Badge: "CÂU HỎI THƯỜNG GẶP",
    p10Line1: "Bắt cặp không cần lướt dạo",
    p10Line2: "Bắt cặp không cần lướt dạo",
    p10Line3: "Bắt cặp không cần lướt dạo",
    p10Btn1: "Tìm hiểu các hướng dẫn bắt cặp",
    p10Btn2: "Tuyên ngôn của chúng tôi",
    p11Bubble: "Một người bạn nhắn tin cho bạn đã sẵn sàng cuộc gặp.",
    p11Resources: "Tài nguyên",
    p11Manifesto: "Tuyên ngôn",
    p11Guide: "Cẩm nang ghép cặp",
    p11Campuses: "Bắt cặp theo trường Đại học",
    p11Terms: "Điều khoản",
    p11Privacy: "Sự riêng tư",
    p11Cookie: "Chính sách Cookie",
    loginModalTitle: "Đăng nhập",
    loginModalInputLabel: "Email trường hoặc số điện thoại của bạn",
    continueBtn: "Tiếp tục",
    orText: "hoặc",
    loginWithGoogle: "Đăng nhập với Google",
    noAccount: "Bạn không có tài khoản?",
    signUp: "Đăng ký",
    
    // ONBOARDING
    obTitle: "Bước 1: Bạn là ai",
    obSub: "Vui lòng cung cấp thông tin cơ bản của bạn",
    obCvTitle: "Tải CV lên",
    obCvMain: "Điền toàn bộ hồ sơ chỉ trong một cú nhấp",
    obCvDesc: "Tải CV lên và hệ thống tự động bóc tách chuyên ngành, trường, kỹ năng, cuộc thi và dự án.",
    obChooseFile: "Chọn file",
    obCvHint: "hoặc kéo thả — PDF, DOC, tối đa 5MB",
    obUploaded: "Đã tải lên:",
    obNoCv: "Không có CV? Không sao — bạn có thể tự điền các trường bên dưới.",
    obFirstName: "Tên",
    obLastName: "Họ",
    obDob: "Ngày sinh",
    obGender: "Giới tính",
    obGenSelect: "Chọn giới tính",
    obMale: "Nam",
    obFemale: "Nữ",
    obOther: "Khác",
    obInsta: "Instagram của bạn",
    obFb: "Facebook của bạn",
    obLi: "LinkedIn của bạn",
    obSocialReq: "Thêm ít nhất một liên kết mạng xã hội",
    obAbout: "Về tôi",
    obAboutHint: "Điều đầu tiên bạn muốn mọi người biết về mình là gì? VD: Sinh viên năm 3 | Thích cày Case Study & Product",
    obAboutSub: "*Tiêu đề sẽ hiển thị đại diện trên thẻ ghép cặp của bạn",
    obCity: "Tỉnh/Thành phố",
    obCitySelect: "Chọn tỉnh/thành phố",
    obUni: "Trường đại học",
    obUniInput: "Nhập tên trường đại học...",
    obField: "Lĩnh vực",
    obFieldSelect: "Chọn lĩnh vực",
    obSkills: "Kỹ năng",
    obSkillSearch: "Tìm kỹ năng...",
    obSkillPop: "Kỹ năng gợi ý phổ biến",
    obSkillNotFound: "Không tìm thấy kỹ năng phù hợp.",
    obComp: "Cuộc thi",
    obCompSub: "Các cuộc thi bạn đã từng tham gia hoặc có dự định thi.",
    obCompEmpty: "Chưa thêm cuộc thi nào",
    obCompAdd: "Thêm cuộc thi",
    obCompName: "Tên cuộc thi...",
    obCompRole: "Vai trò (VD: Leader, Designer...)",
    obCompYear: "Năm",
    obProj: "Dự án",
    obProjSub: "Các đồ án môn học hoặc dự án thực chiến.",
    obProjEmpty: "Chưa thêm dự án nào",
    obProjAdd: "Thêm dự án",
    obProjName: "Tên dự án...",
    obProjRole: "Vai trò của bạn...",
    obProjLink: "Link (Figma, GitHub, Notion...)",
    obCancel: "Hủy",
    obSave: "Lưu",
    obDraft: "Lưu nháp",
    obSkip: "Bỏ qua tạm thời",
    obNext: "Tiếp theo",
    
    // DASHBOARD & MODAL
    dbEco: "Hệ sinh thái ghép đội",
    dbBack: "← Về lại trang chủ",
    dbNavSearch: "Tìm kiếm cuộc thi, sự kiện...",
    dbBannerTitle: "Tìm đồng đội hoàn hảo cùng Adam",
    dbBannerDesc: "Hệ thống phân tích hồ sơ và phong cách làm việc để đề xuất những mảnh ghép bù trừ xuất sắc nhất.",
    dbTurnOnAi: "Bật Ghép Đội AI",
    dbExplore: "Khám phá cuộc thi",
    dbMyTeams: "Nhóm của tôi",
    dbFilterAll: "Tất cả",
    dbFilterOpenNow: "Đang mở đơn",
    dbFilterUp: "Sắp diễn ra",
    dbShowing: "Đang hiển thị",
    dbCompsLooking: "cuộc thi có sinh viên tìm đồng đội",
    dbFindWithAi: "Tìm đồng đội với AI",
    
    chatMatchFor: "Đang ghép đội cho:",
    chatInput: "Nhập yêu cầu của bạn (VD: Mình làm BA, cần 1 bạn Dev & 1 bạn Design)...",
    chatPasteLink: "Dán Link CV",
    chatScanQR: "Quét QR Sinh Viên",
    chatLoading: "Adam đang đối soát kỹ năng và tìm kiếm ứng viên phù hợp...",
    
    qrTitle: "Quét mã QR sinh viên",
    qrReading: "Đang phân tích thông tin hồ sơ...",
    qrDesc: "Đặt mã QR hoặc thẻ sinh viên phía trước camera",
    qrStart: "Bắt đầu quét",
    qrScanning: "Đang quét...",
    linkTitle: "Dán liên kết CV / Portfolio",
    linkInput: "https://linkedin.com/in/... hoặc link Notion / Google Drive",
    linkExtract: "Trích xuất năng lực"
  },
  en: {
    login: "Log In",
    joinNow: "Join Now",
    noReply: "Adam didn't reply?",
    resend: "Resend notification",
    heroTitle1: "Find the right match – Lock in your",
    heroTitle2: "study & project team",
    yourSchool: "@ Your University",
    meetTime: "Time left until this week's drop",
    sendMsgBtn: "Message Adam to match team",
    terms: "By continuing, you agree to our Terms & Privacy Policy.",
    howItWorksBadge1: "HOW IT",
    howItWorksBadge2: "WORKS",
    step1Title: "Tell Jobbod about your personality type",
    step1Desc: "Submit your request before 11:59 PM Friday.",
    step2Title: "The Sunday Drop",
    step2Desc: "Check your email at 7:00 PM. We will send you a personalized compatible teammate and schedule your meetup!",
    step3Title: "Set the date",
    step3Desc: "Find a mutual time that fits both schedules to meet up",
    step4Title: "Good luck!",
    step4Desc: "Start connecting with like-minded peers on your academic journey!",
    companionBadge1: "YOUR PERSONALIZED",
    companionBadge2: "STUDY COMPANION",
    compCol1Title: "Cognitive Matching Framework",
    compCol1Sub: "Smart Matchmaker",
    compCol1Desc: "Optimized through behavioral compatibility models",
    compCol2Title: "Adam understands your major, technical strengths, and collaboration vibe.",
    compCol2Scan: "🎯 Skill DNA Scan",
    compCol3Title: "Pinpoint teammates who balance out your skills and share your target deadlines.",
    compCol3Sub: "Smart Cross-check",
    compCol3Desc: "Real-time pool synchronization",
    chatAiBtn: "Chat with AI Now",
    p7Badge: "TIRED OF SEARCHING FOR TEAMMATES BY SCROLLING FACEBOOK AND SOCIAL GROUPS?",
    p7SubBadge: "Jobbod is tailor-made for you!",
    p7LeftHeader: "On Jobbod",
    p7LeftSub: "Meetup invitations ready to go",
    p7InviteText: "Your meetup has been scheduled for Friday. View details.",
    p7RightHeader: "Traditional Social Media",
    p7RightSub: "Endless scrolling, awkward cold DMs, and ghosted conversations",
    p8Badge1: "VERIFIED. PRIVATE.",
    p8Badge2: "SAFE & SECURE",
    p8Sec1Title: "Verified Students #1",
    p8Sec1Desc: "100% institutional email verification (@school.edu)",
    p8Sec2Title: "Absolute Privacy #2",
    p8Sec2Desc: "Only your confirmed matched peer can view your contact profile",
    p8Sec3Title: "Safe Meetup Spaces #3",
    p8Sec3Desc: "Meet in public campus collaborative areas or partner coffee spots",
    p9Badge: "FREQUENTLY ASKED QUESTIONS",
    p10Line1: "Matching without mindless scrolling",
    p10Line2: "Matching without mindless scrolling",
    p10Line3: "Matching without mindless scrolling",
    p10Btn1: "Explore Matching Guides",
    p10Btn2: "Our Manifesto",
    p11Bubble: "A classmate has messaged you, ready to meet.",
    p11Resources: "Resources",
    p11Manifesto: "Manifesto",
    p11Guide: "Matching Guide",
    p11Campuses: "Match by Universities",
    p11Terms: "Terms",
    p11Privacy: "Privacy",
    p11Cookie: "Cookie Policy",
    loginModalTitle: "Log In",
    loginModalInputLabel: "Your school email or phone number",
    continueBtn: "Continue",
    orText: "or",
    loginWithGoogle: "Sign in with Google",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",

    // ONBOARDING
    obTitle: "Step 1: Who are you",
    obSub: "Please provide your basic information",
    obCvTitle: "Upload CV",
    obCvMain: "Fill your entire profile in one click",
    obCvDesc: "Upload your CV and we will automatically parse your academic background and project history.",
    obChooseFile: "Choose file",
    obCvHint: "or drag & drop — PDF, DOC up to 5MB",
    obUploaded: "Uploaded:",
    obNoCv: "No CV? Fill out the fields manually below.",
    obFirstName: "First Name",
    obLastName: "Last Name",
    obDob: "Date of Birth",
    obGender: "Gender",
    obGenSelect: "Select gender",
    obMale: "Male",
    obFemale: "Female",
    obOther: "Other",
    obInsta: "Instagram handle",
    obFb: "Facebook link",
    obLi: "LinkedIn profile",
    obSocialReq: "Add at least one social contact",
    obAbout: "About me",
    obAboutHint: "What's the key thing peers should know? Ex: Junior BA | Focused on Hackathons & AI",
    obAboutSub: "*This headline will be featured on your match card",
    obCity: "Province / City",
    obCitySelect: "Select province/city",
    obUni: "University",
    obUniInput: "Enter university name...",
    obField: "Field of Study",
    obFieldSelect: "Select field",
    obSkills: "Skills",
    obSkillSearch: "Search skills...",
    obSkillPop: "Popular skills",
    obSkillNotFound: "No matching skills found.",
    obComp: "Competitions",
    obCompSub: "Competitions you have joined or plan to enter.",
    obCompEmpty: "No competitions added yet",
    obCompAdd: "Add competition",
    obCompName: "Competition name...",
    obCompRole: "Role (e.g. Lead, Dev...)",
    obCompYear: "Year",
    obProj: "Projects",
    obProjSub: "Academic coursework or independent projects.",
    obProjEmpty: "No projects added yet",
    obProjAdd: "Add project",
    obProjName: "Project name...",
    obProjRole: "Your role...",
    obProjLink: "Link (GitHub, Figma...)",
    obCancel: "Cancel",
    obSave: "Save",
    obDraft: "Save draft",
    obSkip: "Skip for now",
    obNext: "Next",

    // DASHBOARD & MODAL
    dbEco: "Team matching ecosystem",
    dbBack: "← Back to home",
    dbNavSearch: "Search competitions, hackathons...",
    dbBannerTitle: "Find your ideal teammate with Adam",
    dbBannerDesc: "Our system analyzes your career profile and work rhythm to suggest teammates who complement your strengths.",
    dbTurnOnAi: "Enable AI Matching",
    dbExplore: "Explore Competitions",
    dbMyTeams: "My Teams",
    dbFilterAll: "All",
    dbFilterOpenNow: "Open Now",
    dbFilterUp: "Upcoming",
    dbShowing: "Showing",
    dbCompsLooking: "competitions looking for teammates",
    dbFindWithAi: "Find Teammates",
    
    chatMatchFor: "Matching team for:",
    chatInput: "Describe who you need (e.g. I am a BA, looking for a Frontend Dev)...",
    chatPasteLink: "Paste CV Link",
    chatScanQR: "Scan Student QR",
    chatLoading: "Adam is analyzing skills and finding compatible peers...",
    
    qrTitle: "Scan Student ID / QR",
    qrReading: "Reading student credentials...",
    qrDesc: "Position your student QR code in front of the camera",
    qrStart: "Start scanning",
    qrScanning: "Scanning...",
    linkTitle: "Paste CV / Portfolio Link",
    linkInput: "https://linkedin.com/in/... or Google Drive link",
    linkExtract: "Extract Profile"
  }
};

const FAQ_DATA = [
  {
    q: "Jobbod ghép cặp người dùng như thế nào?",
    a: "Jobbod sử dụng thuật toán đàm phán máy-với-máy (A2A) để tự động đối soát hồ sơ. Hệ thống không ghép ngẫu nhiên mà phân tích nguyên tắc bù trừ kỹ năng (ví dụ: bạn giỏi Code, AI sẽ tìm người giỏi Design/Thuyết trình) và độ tương thích về phong cách làm việc để đề xuất đồng đội chuẩn xác nhất."
  },
  {
    q: "Jobbod hoạt động như thế nào?",
    a: "Bạn không cần điền form hay lướt tìm hồ sơ. Bạn chỉ cần truy cập link/QR và trò chuyện tự nhiên với trợ lý AI Adam. AI sẽ tự bóc tách nhu cầu, tạo lập hồ sơ năng lực thực chiến (Career DNA) ngầm, tự động đàm phán với AI của người khác để chốt nhóm, và cuối cùng là gợi ý địa điểm gặp mặt trực tiếp."
  },
  {
    q: "Tôi sẽ biết gì về người được ghép trước khi gặp gỡ?",
    a: "Bạn sẽ được xem trước bản tóm tắt Career DNA ẩn danh của đối tác, bao gồm: thế mạnh kỹ năng, vai trò dự kiến trong nhóm, và phong cách chạy deadline. Thông tin định danh cá nhân (tên thật, phương thức liên lạc) chỉ được mở khóa khi cả hai bên cùng xác nhận đồng ý ghép cặp (Human-in-the-loop)."
  },
  {
    q: "Nếu tôi không thích người ghép cặp đó thì sao?",
    a: "Bạn hoàn toàn nắm quyền quyết định cuối cùng. Nếu hồ sơ Career DNA do AI đề xuất không đúng ý, bạn chỉ cần bấm từ chối. AI Adam sẽ ghi nhận phản hồi để tinh chỉnh lại tiêu chí và tiếp tục tự động tìm kiếm phương án ghép cặp khác phù hợp hơn."
  },
  {
    q: "Ai sẽ tham gia?",
    a: "Trong giai đoạn đầu, hệ thống thiết kế dành riêng cho sinh viên các trường đại học có nhu cầu tìm đồng đội để làm đồ án môn học, tham gia các cuộc thi học thuật, hackathon hoặc các dự án thực tế ngắn hạn."
  },
  {
    q: "Nếu tôi không thể đến vào phút cuối thì sao?",
    a: "Bạn cần báo hủy trực tiếp trên giao diện chat của Jobbod để hệ thống thông báo cho đối tác 6 tiếng trước cuộc hẹn. Cần lưu ý, việc bùng hẹn (ghosting) hoặc hủy sát giờ nhiều lần sẽ làm giảm điểm uy tín trong hồ sơ Career DNA của bạn, ảnh hưởng đến khả năng được AI ưu tiên ghép nối trong tương lai."
  },
  {
    q: "Thông thường mất bao lâu?",
    a: "Quá trình trò chuyện (onboarding) với AI Adam chỉ mất khoảng 2-3 phút. Thời gian AI đàm phán ngầm để chốt được nhóm thành công thường diễn ra trong vài giờ đến tối đa 24h, tùy thuộc vào độ hiếm của kỹ năng mà bạn đang tìm kiếm hoặc bù trừ."
  },
  {
    q: "Nếu tôi không nhận được phản hồi từ Jobbod thì sao?",
    a: "Đừng lo lắng, Jobbod luôn đàm phán ngầm liên tục 24/7. Nếu hệ thống chưa tìm được người khớp 100% yêu cầu, AI Adam sẽ chủ động nhắn tin cập nhật tiến độ cho bạn và gợi ý nới lỏng một vài tiêu chí (như khoảng cách di chuyển hoặc lịch rảnh) để đẩy nhanh tốc độ ghép nhóm."
  },
  {
    q: "Các buổi gặp gỡ thường diễn ra ở đâu?",
    a: "Jobbod sẽ tự động phân tích vị trí và lịch trình của các thành viên để gợi ý điểm hẹn tại các không gian công cộng an toàn như khuôn viên trường đại học hoặc các quán cà phê đối tác ngay gần khu vực học tập của bạn."
  }
];

const HACKATHONS_DATA = [
  {
    id: 1,
    title: "SAIL YOUR SHIP X",
    organizer: "CLB Kinh tế học - ECS - Trường ĐH Kinh tế - Luật, ĐHQG-HCM",
    deadline: "11h left to apply",
    location: "Hồ Chí Minh",
    tags: ["Research / Paper", "Human Resources", "University Student"],
    status: "Open",
    matchingCount: "5",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "CUỘC THI THỰC CHIẾN KINH DOANH E-BATTLEFIELD 2026",
    organizer: "CLB Thương mại điện tử ĐH Kinh tế Quốc dân ECC - NEU",
    deadline: "13h left to apply",
    location: "Hà Nội",
    tags: ["Case Competition", "E-commerce", "University Student"],
    status: "Open",
    matchingCount: "12",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "RE:ACT - Youth Innovation Challenge 2026",
    organizer: "Đại học Bách Khoa - ĐHQG TP.HCM",
    deadline: "2 days left",
    location: "Toàn quốc",
    tags: ["Hackathon", "AI & Data", "Startup"],
    status: "Upcoming",
    matchingCount: "28",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60"
  }
];

export default function App() {
  const [lang, setLang] = useState('vi');
  const t = TRANSLATIONS[lang];

  const [currentView, setCurrentView] = useState('landing'); 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [selectedHackathon, setSelectedHackathon] = useState(HACKATHONS_DATA[0]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [infoModalType, setInfoModalType] = useState(null);

  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 1, seconds: 20 });

  useEffect(() => {
    const calculateTimeUntilDrop = () => {
      const now = new Date();
      const nextDrop = new Date();
      const currentDay = now.getDay();
      const daysUntilSunday = (7 - currentDay) % 7;
      nextDrop.setDate(now.getDate() + daysUntilSunday);
      nextDrop.setHours(19, 0, 0, 0);

      if (nextDrop <= now) {
        nextDrop.setDate(nextDrop.getDate() + 7);
      }

      const diff = nextDrop - now;
      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        hours: totalHours,
        minutes: minutes,
        seconds: seconds
      });
    };

    calculateTimeUntilDrop();
    const timer = setInterval(calculateTimeUntilDrop, 1000);
    return () => clearInterval(timer);
  }, []);

  const [dbTab, setDbTab] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [competitions, setCompetitions] = useState([]);
  const [isAddingComp, setIsAddingComp] = useState(false);
  const [compForm, setCompForm] = useState({ name: '', role: '', year: '' });

  const [projects, setProjects] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projForm, setProjForm] = useState({ name: '', role: '', link: '' });

  const [onboardingChatStep, setOnboardingChatStep] = useState(0);
  const [onboardingMessages, setOnboardingMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Chào bạn! Mình là Adam. Để ghép đúng cạ cứng cho bạn, cho mình hỏi: Bạn đang chuẩn bị cày đồ án môn gì hay đang ngắm nghía cuộc thi nào (như Hackathon, Hùng biện...) thế?"
    }
  ]);
  const [onboardingInput, setOnboardingInput] = useState('');
  const [isOnboardingAiTyping, setIsOnboardingAiTyping] = useState(false);
  const onboardingChatEndRef = useRef(null);

  const [extractedGoal, setExtractedGoal] = useState({
    context: "Đang phân tích...",
    strengths: "Đang phân tích...",
    locationStyle: "Đang phân tích..."
  });

  const [isCommitted, setIsCommitted] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Chào bạn! Mình là trợ lý AI Adam. Mình giúp bạn phân tích dữ liệu, ghép đội chuẩn gu cho cuộc thi hoặc đồ án. Bạn đang tìm đồng đội có kỹ năng gì?",
      dna: null,
      suggestedTeams: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [cvLinkInput, setCvLinkInput] = useState('');
  const [confirmedMatch, setConfirmedMatch] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    onboardingChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [onboardingMessages, isOnboardingAiTyping]);

  const toggleLanguage = () => setLang(prev => prev === 'vi' ? 'en' : 'vi');
  const toggleFaq = (index) => setOpenFaqIndex(prev => prev === index ? null : index);

  const handleOnboardingChatSend = () => {
    if (!onboardingInput.trim()) return;
    const userText = onboardingInput;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setOnboardingMessages(prev => [...prev, userMsg]);
    setOnboardingInput('');
    setIsOnboardingAiTyping(true);

    setTimeout(() => {
      let nextStep = onboardingChatStep + 1;
      let replyText = "";

      if (onboardingChatStep === 0) {
        setExtractedGoal(prev => ({ ...prev, context: userText }));
        replyText = "Ghi nhận mục tiêu của bạn! Trong dự án/cuộc thi này, phần nào bạn tự tin 'cân' được nhất, và phần nào bạn muốn 'khoán' cho một đồng đội khác gánh giùm?";
      } else if (onboardingChatStep === 1) {
        setExtractedGoal(prev => ({ 
          ...prev, 
          strengths: "Thế mạnh của bạn: " + userText.slice(0, 40)
        }));
        replyText = "Rất rõ ràng! Cuối cùng, team mình sẽ chạy deadline theo kiểu 'cày đêm' hay gặp mặt cuốn chiếu mỗi tuần? Quanh trường bạn hay ngồi quán cà phê nào nhất để Adam tìm người gần gu gặp gỡ trực tiếp?";
      } else {
        setExtractedGoal(prev => ({ 
          ...prev, 
          locationStyle: userText 
        }));
        replyText = "Tuyệt vời! Adam đã nắm trọn vẹn mục tiêu, kỹ năng bù trừ và điểm hẹn gặp gỡ. Mời bạn bấm 'Tiếp tục sang Bước 3' bên dưới để chốt điều kiện ghép đội nhé!";
      }

      setOnboardingMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: replyText }]);
      setOnboardingChatStep(nextStep);
      setIsOnboardingAiTyping(false);
    }, 1200);
  };

  const openAiMatchFor = (hackathon) => {
    setSelectedHackathon(hackathon);
    setIsAiModalOpen(true);
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Tuyệt vời! Bạn đang muốn tìm đồng đội cho cuộc thi "${hackathon.title}". Mình là Adam, hãy chia sẻ cho mình: Bạn có thế mạnh gì (Code, BA, Design...) và phong cách làm việc mong muốn nhé!`,
        dna: null,
        suggestedTeams: null
      }
    ]);
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "Adam đã phân tích hồ sơ và phong cách của bạn! Dưới đây là Career DNA và các đồng đội bù trừ hoàn hảo nhất dành cho bạn:",
        dna: {
          role: query.toLowerCase().includes('design') ? "UI/UX Designer" : "Business Analyst / Tech Lead",
          skills: ["Problem Solving", "Figma / SQL", "Teamwork", "Agile Execution"],
          vibe: "Thực chiến, kỷ luật, giao tiếp chủ động"
        },
        suggestedTeams: [
          {
            id: "t1",
            matchRate: "98%",
            roleNeeded: "Bù trừ kỹ năng Data / Technical",
            members: [
              { name: "Minh Quân", school: "ĐH Kinh tế - Luật", role: "Market Research & Pitching", avatar: "MQ" },
              { name: "Hải Nam", school: "ĐH Bách Khoa", role: "Fullstack / AI Developer", avatar: "HN" }
            ],
            cafeSuggest: "The Coffee House - Tô Hiến Thành"
          }
        ]
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleScanQR = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowQrModal(false);
      handleSendMessage("[Đã quét mã QR Profile]: Adam đã trích xuất thông tin sinh viên & danh mục kỹ năng.");
    }, 2000);
  };

  const handleExtractLink = () => {
    if (!cvLinkInput.trim()) return;
    setShowLinkModal(false);
    handleSendMessage(`[Trích xuất từ Link Profile/CV]: ${cvLinkInput}`);
    setCvLinkInput('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginInput.trim()) return;
    setShowLoginModal(false);
    setCurrentView('dashboard');
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const saveCompetition = () => {
    if (compForm.name.trim()) {
      setCompetitions([...competitions, compForm]);
      setCompForm({ name: '', role: '', year: '' });
      setIsAddingComp(false);
    }
  };

  const saveProject = () => {
    if (projForm.name.trim()) {
      setProjects([...projects, projForm]);
      setProjForm({ name: '', role: '', link: '' });
      setIsAddingProject(false);
    }
  };

  const removeComp = (idx) => setCompetitions(competitions.filter((_, i) => i !== idx));
  const removeProj = (idx) => setProjects(projects.filter((_, i) => i !== idx));

  const formatTimeNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="min-h-screen font-sans selection:bg-amber-600 selection:text-white">
      
      {/* ================= VIEW 1: LANDING PAGE ================= */}
      {currentView === 'landing' ? (
        <div className="relative w-full select-none text-white min-h-screen">
          
          <div 
            className="fixed inset-0 bg-cover bg-center -z-30 pointer-events-none scale-105"
            style={{ 
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: 'center 32%'
            }}
          />

          <div className="fixed inset-0 bg-gradient-to-b from-stone-950/40 via-stone-900/25 to-stone-950/70 -z-20 pointer-events-none" />

          {/* HEADER */}
          <header className="fixed top-0 left-0 right-0 px-6 md:px-12 py-4 flex items-center justify-between z-40 bg-stone-950/40 backdrop-blur-md border-b border-white/10">
            <div onClick={() => { setCurrentView('landing'); setShowLoginModal(false); }} className="cursor-pointer">
              <span className="text-3xl md:text-4xl font-cooper tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] italic font-black">
                Jobbod
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleLanguage} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-xs font-semibold text-white border border-white/15 transition-all active:scale-95 shadow-sm">
                <Globe size={13} />
                <span>{lang === 'vi' ? 'VIE' : 'ENG'}</span>
              </button>
              <button onClick={() => setShowLoginModal(true)} className="text-xs font-medium text-stone-200 hover:text-white bg-stone-900/60 hover:bg-stone-900/80 backdrop-blur-md px-4 py-2 rounded-xl transition-all border border-white/10">
                {t.login}
              </button>
              
              <button 
                onClick={() => setCurrentView('onboarding_step1')} 
                className="text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles size={13} className="text-stone-900" />
                <span>{t.joinNow}</span>
              </button>
            </div>
          </header>

          {/* SECTION 1: HERO */}
          <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10">
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-20 relative max-w-4xl mx-auto">
              
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-900/45 backdrop-blur-md border border-white/10 text-[11px] text-stone-200 shadow-sm mb-3">
                <span>{t.noReply}</span>
                <span className="underline cursor-pointer hover:text-amber-300 font-semibold">{t.resend}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] max-w-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.heroTitle1} <br />
                <span className="text-stone-100">{t.heroTitle2}</span>
              </h1>

              <div className="mt-3 mb-5 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-stone-900/60 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-400/25 shadow-sm">
                <span>{t.yourSchool}</span>
              </div>

              <div className="relative flex flex-col items-center gap-3.5 w-full max-w-md">
                <div className="w-full bg-stone-950/65 backdrop-blur-xl border border-stone-200/15 rounded-3xl p-5 shadow-2xl space-y-2">
                  <div className="text-[11px] text-stone-300 uppercase tracking-wider font-medium flex items-center justify-center gap-1.5">
                    <Clock size={12} className="text-amber-400 animate-pulse" />
                    <span>{t.meetTime}</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 py-1 font-mono">
                    <div className="flex flex-col items-center min-w-[54px]">
                      <span className="text-3xl md:text-4xl font-extrabold text-amber-300 tracking-tight">{formatTimeNumber(timeLeft.hours)}</span>
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 mt-0.5">Giờ</span>
                    </div>
                    <span className="text-2xl text-stone-500 font-light mb-3 animate-pulse">:</span>
                    <div className="flex flex-col items-center min-w-[54px]">
                      <span className="text-3xl md:text-4xl font-extrabold text-amber-300 tracking-tight">{formatTimeNumber(timeLeft.minutes)}</span>
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 mt-0.5">Phút</span>
                    </div>
                    <span className="text-2xl text-stone-500 font-light mb-3 animate-pulse">:</span>
                    <div className="flex flex-col items-center min-w-[54px]">
                      <span className="text-3xl md:text-4xl font-extrabold text-amber-300 tracking-tight">{formatTimeNumber(timeLeft.seconds)}</span>
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 mt-0.5">Giây</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsAiModalOpen(true)} 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-900 font-bold text-sm shadow-[0_10px_25px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <div className="w-7 h-7 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-inner">
                    <MessageSquare size={15} />
                  </div>
                  <span>{t.sendMsgBtn}</span>
                </button>
              </div>

            </main>
            <footer className="w-full text-center px-4 z-20">
              <p className="text-[11px] text-stone-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{t.terms}</p>
            </footer>
          </section>

          {/* SECTION 2: CÁCH CHÚNG TÔI HOẠT ĐỘNG (CHUẨN 100% THEO ẢNH GỐC) */}
          <section className="relative min-h-screen w-full py-20 px-6 md:px-16 flex flex-col items-center justify-between border-t border-white/10 overflow-hidden">
            {/* Ảnh nền nhóm sinh viên làm việc nhóm */}
            <div 
              className="absolute inset-0 bg-cover bg-center -z-10 pointer-events-none"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80')`,
                filter: 'brightness(0.32) contrast(1.1)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 -z-10" />

            {/* Badge Tiêu đề chính giữa: CÁCH CHÚNG TÔI HOẠT ĐỘNG */}
            <div className="w-full flex justify-center mb-10 z-10">
              <div className="bg-black/90 border border-white/20 rounded-2xl px-8 py-3 text-center shadow-2xl backdrop-blur-md min-w-[260px]">
                <span className="block text-xs md:text-sm font-black uppercase tracking-widest text-white">
                  {t.howItWorksBadge1}
                </span>
                <span className="block text-xl md:text-2xl font-black tracking-wider text-[#3B82F6] mt-0.5 uppercase">
                  {t.howItWorksBadge2}
                </span>
              </div>
            </div>

            {/* 4 Bước dạng nổi trên nền ảnh gốc */}
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 z-10 my-auto text-white">
              
              {/* BƯỚC 1: Hãy cho Jobbod biết bạn thuộc nhóm tính cách nào? */}
              <div className="flex flex-col space-y-3 max-w-lg">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EA580C] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                    1
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white tracking-wide">
                    {t.step1Title}
                  </h3>
                </div>
                <p className="text-xs text-stone-200 pl-10 leading-relaxed font-normal">
                  {t.step1Desc}
                </p>

                {/* Minh họa: Sticker CV icon bar + Mockup điện thoại */}
                <div className="pl-10 pt-2 flex items-center gap-3">
                  <div className="bg-[#2563EB] rounded-2xl p-1.5 px-3 flex items-center gap-2 shadow-xl border border-blue-400/40">
                    <span className="bg-white text-blue-800 text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                      📄 CV
                    </span>
                    <span className="text-base">👩‍💼</span>
                    <span className="text-base">👨‍💻</span>
                    <span className="bg-[#84CC16] text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow tracking-tighter">
                      JOB
                    </span>
                  </div>

                  <div className="w-14 h-24 bg-black rounded-2xl border-2 border-stone-600 p-1 relative shadow-2xl overflow-hidden flex flex-col justify-end">
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-stone-700 rounded-full" />
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                      alt="Candidate phone screen" 
                      className="w-full h-20 object-cover rounded-xl grayscale contrast-125"
                    />
                  </div>
                </div>
              </div>

              {/* BƯỚC 2: The Sunday Drop */}
              <div className="flex flex-col space-y-3 max-w-lg">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EA580C] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                    2
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white tracking-wide">
                    {t.step2Title}
                  </h3>
                </div>
                <p className="text-xs text-stone-200 pl-10 leading-relaxed font-normal">
                  {t.step2Desc}
                </p>

                {/* Minh họa: 4 Thẻ thành viên pastel Nam, An, John, Nga */}
                <div className="pl-10 pt-2">
                  <div className="inline-flex rounded-xl overflow-hidden shadow-2xl border-2 border-white/60 bg-white">
                    <div className="w-16 bg-[#FEF08A] flex flex-col items-center p-1 border-r border-stone-300">
                      <img 
                        src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80" 
                        alt="Nam" 
                        className="w-14 h-16 object-cover rounded" 
                      />
                      <span className="text-[11px] font-bold text-stone-900 mt-1">Nam</span>
                    </div>

                    <div className="w-16 bg-[#DDD6FE] flex flex-col items-center p-1 border-r border-stone-300">
                      <img 
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80" 
                        alt="An" 
                        className="w-14 h-16 object-cover rounded" 
                      />
                      <span className="text-[11px] font-bold text-stone-900 mt-1">An</span>
                    </div>

                    <div className="w-16 bg-[#BBF7D0] flex flex-col items-center p-1 border-r border-stone-300">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" 
                        alt="John" 
                        className="w-14 h-16 object-cover rounded" 
                      />
                      <span className="text-[11px] font-bold text-stone-900 mt-1">John</span>
                    </div>

                    <div className="w-16 bg-[#FBCFE8] flex flex-col items-center p-1">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80" 
                        alt="Nga" 
                        className="w-14 h-16 object-cover rounded" 
                      />
                      <span className="text-[11px] font-bold text-stone-900 mt-1">Nga</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BƯỚC 3: Lên lịch ngày (Cuốn lịch để bàn) */}
              <div className="flex flex-col space-y-3 max-w-lg">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EA580C] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                    3
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t.step3Title}
                  </h3>
                </div>
                <p className="text-xs text-stone-200 pl-10 leading-relaxed font-normal">
                  {t.step3Desc}
                </p>

                {/* Minh họa: Cuốn lịch để bàn Desk Calendar nghiêng 3D */}
                <div className="pl-10 pt-2">
                  <div className="w-48 bg-[#FFFDF9] text-stone-900 rounded-xl p-3 shadow-2xl border-2 border-amber-500/80 relative font-sans transform -rotate-2 hover:rotate-0 transition-transform">
                    <div className="absolute -top-2 inset-x-0 flex justify-around px-3">
                      {[...Array(7)].map((_, i) => (
                        <span key={i} className="w-1.5 h-3 bg-stone-700 rounded-full border border-stone-900 shadow-sm" />
                      ))}
                    </div>

                    <div className="bg-[#EA580C] text-white rounded-md px-2 py-1 flex items-center justify-between mt-1 shadow-inner">
                      <span className="text-[10px] font-black uppercase tracking-wider">NOVEMBER</span>
                      <span className="text-[10px] font-mono font-bold">2025</span>
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 text-[8px] font-bold text-stone-400 text-center mt-2 border-b border-stone-200 pb-1">
                      <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 text-[8.5px] font-semibold text-center mt-1.5 text-stone-800">
                      <span className="opacity-0">1</span>
                      <span className="opacity-0">1</span>
                      <span className="opacity-0">1</span>
                      <span>1</span><span>2</span><span>3</span><span>4</span>
                      <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                      <span className="border border-[#EA580C] text-[#EA580C] rounded-full w-4 h-4 flex items-center justify-center mx-auto font-black">11</span>
                      <span>12</span>
                      <span className="border border-blue-600 text-blue-700 rounded-full w-4 h-4 flex items-center justify-center mx-auto font-black">13</span>
                      <span className="bg-[#EA580C] text-white rounded-full w-4 h-4 flex items-center justify-center mx-auto font-black shadow-sm">14</span>
                      <span className="border border-emerald-600 text-emerald-700 rounded-full w-4 h-4 flex items-center justify-center mx-auto font-black">15</span>
                      <span className="border border-amber-600 text-amber-700 rounded-full w-4 h-4 flex items-center justify-center mx-auto font-black">16</span>
                      <span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span>
                      <span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BƯỚC 4: Good luck! */}
              <div className="flex flex-col space-y-3 max-w-lg">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EA580C] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                    4
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t.step4Title}
                  </h3>
                </div>
                <p className="text-xs text-stone-200 pl-10 leading-relaxed font-normal">
                  {t.step4Desc}
                </p>

                {/* Minh họa: Ảnh 2 bạn sinh viên ôm sách đứng trước campus */}
                <div className="pl-10 pt-2">
                  <div className="w-52 h-32 rounded-2xl overflow-hidden border-2 border-white shadow-2xl bg-stone-900">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80" 
                      alt="Two students meeting" 
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 3: BẠN ĐỒNG HÀNH CÁ NHÂN HÓA */}
          <section className="relative min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-white/10">
            <div className="mb-14 text-center">
              <div className="inline-block bg-stone-950/75 border border-stone-200/15 rounded-2xl px-8 py-3 shadow-xl backdrop-blur-xl">
                <span className="block text-xs md:text-sm font-extrabold uppercase tracking-widest text-stone-300">{t.companionBadge1}</span>
                <span className="block text-lg md:text-xl font-black tracking-wider text-amber-300">{t.companionBadge2}</span>
              </div>
            </div>

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
              <div className="bg-stone-950/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <h4 className="font-bold text-sm text-white">{t.compCol1Title}</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{t.compCol1Desc}</p>
              </div>

              <div className="bg-stone-950/85 backdrop-blur-xl border-2 border-amber-400/30 rounded-3xl p-6 shadow-2xl space-y-4 flex flex-col items-center">
                <div className="w-44 h-48 rounded-2xl overflow-hidden relative border border-white/10">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80" alt="Matching Companion" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 inset-x-2 bg-stone-950/80 backdrop-blur-md text-[10px] text-amber-300 font-bold py-1 rounded-lg border border-white/10">
                    {t.compCol2Scan}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{t.compCol2Title}</h4>
              </div>

              <div className="bg-stone-950/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/15 text-emerald-300 flex items-center justify-center">
                  <Laptop size={24} />
                </div>
                <h4 className="font-bold text-sm text-white">{t.compCol3Title}</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{t.compCol3Desc}</p>
              </div>
            </div>

            <div className="mt-12">
              <button 
                onClick={() => setIsAiModalOpen(true)} 
                className="px-8 py-3.5 rounded-2xl bg-stone-900/80 hover:bg-stone-900 text-amber-300 border border-amber-400/30 font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                {t.chatAiBtn}
              </button>
            </div>
          </section>

          {/* SECTION 4: SO SÁNH JOBBOD VỚI MXH */}
          <section className="relative min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-white/10">
            <div className="mb-12 text-center max-w-2xl">
              <div className="bg-stone-950/75 border border-stone-200/15 rounded-2xl px-6 py-3 shadow-xl backdrop-blur-xl inline-block">
                <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wide text-white">{t.p7Badge}</h2>
              </div>
              <div className="mt-2.5">
                <span className="text-sm font-semibold text-amber-300">{t.p7SubBadge}</span>
              </div>
            </div>

            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-stone-950/75 backdrop-blur-xl border border-amber-400/25 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-amber-300">{t.p7LeftHeader}</h3>
                  <p className="text-xs text-stone-300 mt-0.5">{t.p7LeftSub}</p>
                </div>
                <div className="bg-stone-900/80 rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 font-bold flex items-center justify-center flex-shrink-0">
                    A
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Adam Matchmaker</div>
                    <div className="text-[11px] text-stone-300 leading-tight">{t.p7InviteText}</div>
                  </div>
                </div>
              </div>

              <div className="bg-stone-950/75 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-stone-300">{t.p7RightHeader}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">{t.p7RightSub}</p>
                </div>
                <div className="bg-stone-900/60 rounded-2xl p-4 border border-white/5 flex items-center justify-around">
                  <span className="text-xs text-stone-400 italic">"Ai rảnh làm đồ án chung không?"</span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold">Chưa có hồi âm</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: AN TOÀN & XÁC THỰC */}
          <section className="relative min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-white/10">
            <div className="mb-14 text-center">
              <div className="inline-block bg-stone-950/75 border border-stone-200/15 rounded-2xl px-8 py-3 shadow-xl backdrop-blur-xl">
                <span className="text-sm md:text-base font-black tracking-wide text-white uppercase">
                  {t.p8Badge1} <span className="text-amber-300">{t.p8Badge2}</span>
                </span>
              </div>
            </div>

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-stone-950/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                  <UserCheck size={24} />
                </div>
                <h4 className="font-bold text-sm text-white">{t.p8Sec1Title}</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{t.p8Sec1Desc}</p>
              </div>

              <div className="bg-stone-950/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-bold text-sm text-white">{t.p8Sec2Title}</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{t.p8Sec2Desc}</p>
              </div>

              <div className="bg-stone-950/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                  <Coffee size={24} />
                </div>
                <h4 className="font-bold text-sm text-white">{t.p8Sec3Title}</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{t.p8Sec3Desc}</p>
              </div>
            </div>
          </section>

          {/* SECTION 6: FAQ */}
          <section className="relative min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-white/10">
            <div className="mb-10 text-center">
              <div className="inline-block bg-stone-950/75 border border-stone-200/15 rounded-2xl px-8 py-3 shadow-xl backdrop-blur-xl">
                <span className="text-xs md:text-sm font-black tracking-wide text-white uppercase">{t.p9Badge}</span>
              </div>
            </div>
            
            <div className="w-full max-w-2xl bg-stone-950/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-3 max-h-[60vh] overflow-y-auto">
              {FAQ_DATA.map((faq, idx) => (
                <div key={idx} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                  <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between text-left py-2 text-xs md:text-sm font-bold text-white hover:text-amber-300 transition-colors">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`transition-transform duration-200 text-amber-300 flex-shrink-0 ml-2 ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="pt-2 pb-2 text-xs text-stone-300 leading-relaxed pl-2 border-l-2 border-amber-400 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: SLOGAN */}
          <section className="relative min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-white/10 text-center">
            <div className="max-w-2xl w-full space-y-8 flex flex-col items-center">
              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-200 tracking-tight drop-shadow">{t.p10Line1}</h2>
                <h2 className="text-3xl md:text-4xl font-extrabold text-amber-300 tracking-tight italic">{t.p10Line2}</h2>
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-200 tracking-tight drop-shadow">{t.p10Line3}</h2>
              </div>
              <div className="space-y-3 w-full max-w-sm">
                <button 
                  onClick={() => setInfoModalType('guide')} 
                  className="w-full py-3 px-6 rounded-2xl bg-stone-900/80 hover:bg-stone-900 backdrop-blur-md border border-white/15 text-white font-bold text-xs md:text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <BookMarked size={16} className="text-amber-300" />
                  <span>{t.p10Btn1}</span>
                </button>
                <button 
                  onClick={() => setInfoModalType('manifesto')} 
                  className="w-full py-3 px-6 rounded-2xl bg-stone-900/80 hover:bg-stone-900 backdrop-blur-md border border-white/15 text-white font-bold text-xs md:text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Award size={16} className="text-amber-300" />
                  <span>{t.p10Btn2}</span>
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 8: FOOTER */}
          <footer className="w-full bg-stone-950 text-white pt-16 pb-8 px-8 border-t border-white/10">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div className="space-y-4">
                  <div className="inline-block bg-stone-900 text-amber-300 border border-amber-400/20 font-medium text-xs md:text-sm px-5 py-2.5 rounded-2xl rounded-bl-none shadow-lg max-w-xs leading-snug">{t.p11Bubble}</div>
                  <div><span className="text-4xl md:text-5xl font-cooper tracking-tight text-white italic font-black block">Jobbod</span></div>
                </div>
                <div className="space-y-3 md:text-right">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-stone-400">{t.p11Resources}</h4>
                  <ul className="space-y-2 text-sm text-stone-200">
                    <li>
                      <button onClick={() => setInfoModalType('manifesto')} className="inline-flex items-center gap-1 hover:underline hover:text-amber-300 transition-colors">
                        <span>{t.p11Manifesto}</span><ArrowUpRight size={16} />
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setInfoModalType('guide')} className="inline-flex items-center gap-1 hover:underline hover:text-amber-300 transition-colors">
                        <span>{t.p11Guide}</span><ArrowUpRight size={16} />
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setInfoModalType('campuses')} className="inline-flex items-center gap-1 hover:underline hover:text-amber-300 transition-colors">
                        <span>{t.p11Campuses}</span><ArrowUpRight size={16} />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
                <div>© Jobbod 2026. All rights reserved.</div>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                  <button onClick={() => setInfoModalType('terms')} className="hover:underline">{t.p11Terms}</button>
                  <button onClick={() => setInfoModalType('terms')} className="hover:underline">{t.p11Privacy}</button>
                  <button onClick={() => setInfoModalType('terms')} className="hover:underline">{t.p11Cookie}</button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      ) : currentView === 'onboarding_step1' ? (
        /* ONBOARDING BƯỚC 1 */
        <div className="min-h-screen bg-[#0E1015] text-white pt-10 pb-24 px-6 font-sans flex justify-center selection:bg-blue-600 relative">
          <div className="absolute top-6 right-6 md:right-10 z-50">
            <button onClick={toggleLanguage} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/10 transition-all active:scale-95 shadow-sm">
              <Globe size={14} />
              <span>{lang === 'vi' ? 'VIE' : 'ENG'}</span>
            </button>
          </div>

          <div className="max-w-3xl w-full space-y-6 mt-4">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-400/30 mb-2">Bước 1 / 3</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.obTitle}</h1>
              <p className="text-neutral-400 text-sm">{t.obSub}</p>
            </div>

            <div className="bg-[#161820] border border-white/5 rounded-3xl p-6 md:p-8">
              <h3 className="font-semibold text-sm mb-4">{t.obCvTitle}</h3>
              <div className="border-[1.5px] border-dashed border-neutral-700/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[#1C1F26]/30">
                <Sparkles className="text-amber-400 mb-3" size={24} />
                <h4 className="font-bold text-base mb-2">{t.obCvMain}</h4>
                <p className="text-xs text-neutral-400 max-w-md mb-6 leading-relaxed">{t.obCvDesc}</p>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                <button onClick={() => fileInputRef.current.click()} className="bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-neutral-200 transition-colors shadow-sm active:scale-95">
                  {t.obChooseFile}
                </button>
                {uploadedFile ? (
                  <p className="text-xs text-emerald-400 mt-4 font-semibold flex items-center gap-1"><Check size={14}/> {t.obUploaded} {uploadedFile}</p>
                ) : (
                  <p className="text-[11px] text-neutral-500 mt-4">{t.obCvHint}</p>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-4">{t.obNoCv}</p>
            </div>

            <div className="bg-[#161820] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obFirstName}</label>
                  <input type="text" className="w-full bg-[#1C1F26] border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-colors text-white" />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obLastName}</label>
                  <input type="text" className="w-full bg-[#1C1F26] border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-colors text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obDob}</label>
                  <input type="date" className="w-full bg-[#1C1F26] border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-colors text-neutral-400 [color-scheme:dark]" />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obGender}</label>
                  <div className="relative">
                    <select className="w-full bg-[#1C1F26] border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-colors text-neutral-400 appearance-none cursor-pointer">
                      <option>{t.obGenSelect}</option>
                      <option>{t.obMale}</option>
                      <option>{t.obFemale}</option>
                      <option>{t.obOther}</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 text-neutral-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obAbout}<span className="text-rose-500">*</span></label>
                <div className="relative">
                  <textarea rows="4" placeholder={t.obAboutHint} className="w-full bg-[#1C1F26] border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-colors resize-none placeholder:text-neutral-500 text-white"></textarea>
                </div>
                <p className="text-[11px] text-neutral-500 italic mt-2">{t.obAboutSub}</p>
              </div>
            </div>

            <div className="bg-[#161820] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obCity}</label>
                  <div className="relative">
                    <select className="w-full bg-[#1C1F26] border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-colors text-neutral-400 appearance-none cursor-pointer">
                      <option value="">{t.obCitySelect}</option>
                      {VIETNAM_PROVINCES.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 text-neutral-500 pointer-events-none" size={16} />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obUni}</label>
                  <input type="text" placeholder={t.obUniInput} className="w-full bg-[#1C1F26] border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-colors text-white placeholder:text-neutral-500" />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obField}</label>
                <div className="relative">
                  <select className="w-full bg-[#1C1F26] border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-amber-400 outline-none transition-colors text-neutral-400 appearance-none cursor-pointer">
                    <option value="">{t.obFieldSelect}</option>
                    {FIELDS_OF_STUDY.map(field => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 text-neutral-500 pointer-events-none" size={16} />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-neutral-200 mb-2 block">{t.obSkills}</label>
                <div className="relative mb-3 flex flex-wrap gap-2 items-center bg-[#1C1F26] border border-white/5 rounded-xl pl-11 pr-4 py-2 min-h-[46px]">
                  <Search className="absolute left-4 top-3.5 text-neutral-500" size={16} />
                  {selectedSkills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs px-2.5 py-1.5 rounded-lg font-medium">
                      {skill}
                      <X size={14} className="cursor-pointer hover:text-white transition-colors" onClick={() => toggleSkill(skill)} />
                    </span>
                  ))}
                  <input type="text" placeholder={selectedSkills.length === 0 ? t.obSkillSearch : ""} value={skillSearchQuery} onChange={(e) => setSkillSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm focus:outline-none text-white placeholder:text-neutral-500 min-w-[120px]" />
                </div>
                
                <div className="bg-[#1C1F26] border border-white/5 rounded-2xl p-5">
                  <p className="text-xs text-neutral-400 mb-4 font-medium">{t.obSkillPop}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {ALL_SKILLS.filter(skill => skill.toLowerCase().includes(skillSearchQuery.toLowerCase())).map(skill => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <span key={skill} onClick={() => toggleSkill(skill)} className={`px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 ${isSelected ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'}`}>
                            {skill}
                            {isSelected && <Check size={14} />}
                          </span>
                        )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Cuộc thi & Dự án */}
            <div className="bg-[#161820] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              <div>
                <h3 className="font-bold text-sm mb-1.5 text-white">{t.obComp}</h3>
                <p className="text-xs text-neutral-400 mb-4">{t.obCompSub}</p>
                <div className="bg-[#1C1F26] border border-white/5 rounded-2xl p-5 space-y-4">
                  {competitions.length > 0 ? (
                    <div className="space-y-3">
                      {competitions.map((comp, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                          <div>
                            <p className="font-bold text-sm text-amber-300">{comp.name}</p>
                            <p className="text-xs text-neutral-400">{comp.role} • {comp.year}</p>
                          </div>
                          <button onClick={() => removeComp(idx)} className="text-neutral-500 hover:text-rose-400 transition-colors p-1"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  ) : (!isAddingComp && <span className="text-sm text-neutral-500">{t.obCompEmpty}</span>)}

                  {isAddingComp ? (
                    <div className="space-y-3 border border-amber-400/30 p-4 rounded-xl bg-[#161820]">
                      <input type="text" placeholder={t.obCompName} value={compForm.name} onChange={(e) => setCompForm({...compForm, name: e.target.value})} className="w-full bg-[#1C1F26] border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-400" />
                      <div className="flex gap-3">
                        <input type="text" placeholder={t.obCompRole} value={compForm.role} onChange={(e) => setCompForm({...compForm, role: e.target.value})} className="flex-1 bg-[#1C1F26] border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-400" />
                        <input type="text" placeholder={t.obCompYear} value={compForm.year} onChange={(e) => setCompForm({...compForm, year: e.target.value})} className="w-24 bg-[#1C1F26] border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-400" />
                      </div>
                      <div className="flex gap-2 justify-end pt-2">
                        <button onClick={() => setIsAddingComp(false)} className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors">{t.obCancel}</button>
                        <button onClick={saveCompetition} className="text-xs font-bold bg-amber-400 text-stone-900 px-4 py-1.5 rounded-lg hover:bg-amber-300 transition-colors">{t.obSave}</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end mt-2">
                      <button onClick={() => setIsAddingComp(true)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all active:scale-95">
                        <Plus size={14} /> {t.obCompAdd}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="font-bold text-sm mb-1.5 text-white">{t.obProj}</h3>
                <p className="text-xs text-neutral-400 mb-4">{t.obProjSub}</p>
                <div className="bg-[#1C1F26] border border-white/5 rounded-2xl p-5 space-y-4">
                  {projects.length > 0 ? (
                    <div className="space-y-3">
                      {projects.map((proj, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                          <div>
                            <p className="font-bold text-sm text-emerald-400">{proj.name}</p>
                            <p className="text-xs text-neutral-400">{proj.role}</p>
                            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:underline">{proj.link}</a>}
                          </div>
                          <button onClick={() => removeProj(idx)} className="text-neutral-500 hover:text-rose-400 transition-colors p-1"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  ) : (!isAddingProject && <span className="text-sm text-neutral-500">{t.obProjEmpty}</span>)}

                  {isAddingProject ? (
                    <div className="space-y-3 border border-emerald-500/30 p-4 rounded-xl bg-[#161820]">
                      <input type="text" placeholder={t.obProjName} value={projForm.name} onChange={(e) => setProjForm({...projForm, name: e.target.value})} className="w-full bg-[#1C1F26] border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-emerald-500" />
                      <input type="text" placeholder={t.obProjRole} value={projForm.role} onChange={(e) => setProjForm({...projForm, role: e.target.value})} className="w-full bg-[#1C1F26] border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-emerald-500" />
                      <input type="url" placeholder={t.obProjLink} value={projForm.link} onChange={(e) => setProjForm({...projForm, link: e.target.value})} className="w-full bg-[#1C1F26] border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-emerald-500" />
                      <div className="flex gap-2 justify-end pt-2">
                        <button onClick={() => setIsAddingProject(false)} className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors">{t.obCancel}</button>
                        <button onClick={saveProject} className="text-xs font-bold bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-500 transition-colors">{t.obSave}</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end mt-2">
                      <button onClick={() => setIsAddingProject(true)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all active:scale-95">
                        <Plus size={14} /> {t.obProjAdd}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 pb-12">
              <button onClick={() => setCurrentView('dashboard')} className="text-neutral-500 hover:text-white text-sm font-semibold transition-colors">
                {t.obSkip}
              </button>
              <button onClick={() => setCurrentView('onboarding_step2')} className="bg-amber-400 text-stone-900 px-8 py-3 rounded-full font-bold text-sm hover:bg-amber-300 transition-all shadow-lg active:scale-95">
                Tiếp tục sang Bước 2 →
              </button>
            </div>
          </div>
        </div>
      ) : currentView === 'onboarding_step2' ? (
        /* ONBOARDING BƯỚC 2 (CHAT AI) */
        <div className="min-h-screen bg-[#0E1015] text-white pt-10 pb-20 px-4 md:px-6 font-sans flex justify-center selection:bg-blue-600 relative">
          <div className="absolute top-6 right-6 md:right-10 z-50">
            <button onClick={toggleLanguage} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/10 transition-all active:scale-95 shadow-sm">
              <Globe size={14} />
              <span>{lang === 'vi' ? 'VIE' : 'ENG'}</span>
            </button>
          </div>

          <div className="max-w-2xl w-full flex flex-col h-[88vh] mt-2">
            <div className="mb-4">
              <button onClick={() => setCurrentView('onboarding_step1')} className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 mb-2 transition-colors">
                <ChevronLeft size={16} /> Quay lại Bước 1
              </button>
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-400/30 mb-1">Bước 2 / 3</div>
                  <h1 className="text-2xl md:text-3xl font-bold">Mục tiêu tìm kiếm của bạn</h1>
                </div>
                <div className="text-xs text-neutral-400 text-right">
                  Trò chuyện cùng <b>AI Adam</b>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-[#161820] border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-white/5 bg-[#12141A] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center shadow">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-white">Adam - Khai thác tiêu chí ghép cặp</h3>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Đang trực tuyến
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {onboardingMessages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={14} className="text-amber-300" />
                      </div>
                    )}
                    <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-stone-900 rounded-tr-none shadow-md font-medium'
                        : 'bg-[#1C1F26] border border-white/5 text-neutral-200 rounded-tl-none shadow'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isOnboardingAiTyping && (
                  <div className="flex items-center gap-2 text-xs text-neutral-400 italic">
                    <Bot size={14} className="animate-spin text-amber-400" /> Adam đang phân tích câu trả lời của bạn...
                  </div>
                )}
                <div ref={onboardingChatEndRef} />
              </div>

              {onboardingChatStep >= 2 && (
                <div className="p-3 bg-stone-900/60 border-t border-amber-400/20 text-center">
                  <button 
                    onClick={() => setCurrentView('onboarding_step3')}
                    className="w-full py-2.5 rounded-xl bg-amber-400 text-stone-900 font-bold text-xs hover:bg-amber-300 transition-all shadow-md active:scale-95"
                  >
                    Tiếp tục sang Bước 3: Chốt điều kiện & Cam kết →
                  </button>
                </div>
              )}

              <div className="p-3 border-t border-white/5 bg-[#12141A]">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={onboardingInput} 
                    onChange={(e) => setOnboardingInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleOnboardingChatSend()} 
                    placeholder="Nhập câu trả lời của bạn gửi cho Adam..." 
                    className="flex-1 bg-[#1C1F26] border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 text-white placeholder:text-neutral-500" 
                  />
                  <button 
                    onClick={handleOnboardingChatSend} 
                    disabled={!onboardingInput.trim() || isOnboardingAiTyping} 
                    className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 disabled:opacity-40 transition-all active:scale-95"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : currentView === 'onboarding_step3' ? (
        /* ONBOARDING BƯỚC 3 (CHỐT ĐIỀU KIỆN) */
        <div className="min-h-screen bg-[#0E1015] text-white pt-10 pb-24 px-6 font-sans flex justify-center selection:bg-blue-600 relative">
          <div className="absolute top-6 right-6 md:right-10 z-50">
            <button onClick={toggleLanguage} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/10 transition-all active:scale-95 shadow-sm">
              <Globe size={14} />
              <span>{lang === 'vi' ? 'VIE' : 'ENG'}</span>
            </button>
          </div>

          <div className="max-w-2xl w-full space-y-6 mt-4">
            <div className="mb-4">
              <button onClick={() => setCurrentView('onboarding_step2')} className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 mb-2 transition-colors">
                <ChevronLeft size={16} /> Quay lại Bước 2
              </button>
              <div className="inline-block px-3 py-1 bg-emerald-600/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30 mb-2">Bước 3 / 3</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Chốt điều kiện ghép đội</h1>
              <p className="text-neutral-400 text-sm">Xác nhận thông tin & cam kết để hệ thống kích hoạt ghép cặp</p>
            </div>

            {!isSubmittedSuccess ? (
              <div className="space-y-6">
                <div className="bg-[#161820] border border-amber-400/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-300">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Hồ sơ ghép cặp đã được tổng hợp</h3>
                      <p className="text-xs text-neutral-300 leading-relaxed mt-1">
                        Dựa trên những gì bạn đã gửi và chia sẻ với chúng tôi, Jobbod sẽ kích hoạt thuật toán AI để tìm kiếm đồng đội phù hợp với bạn trong thời gian sớm nhất.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#12141A] rounded-2xl p-4 border border-white/5 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-400">Bối cảnh / Mục tiêu:</span>
                      <span className="font-semibold text-white text-right max-w-[280px] truncate">{extractedGoal.context}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-400">Thế mạnh & Kỹ năng:</span>
                      <span className="font-semibold text-amber-300 text-right max-w-[280px] truncate">{extractedGoal.strengths}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Phong cách & Địa điểm:</span>
                      <span className="font-semibold text-emerald-400 text-right max-w-[280px] truncate">{extractedGoal.locationStyle}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#161820] border border-white/10 rounded-2xl p-5 flex items-start gap-3.5 shadow-md">
                  <input 
                    type="checkbox" 
                    id="commitCheck" 
                    checked={isCommitted} 
                    onChange={(e) => setIsCommitted(e.target.checked)} 
                    className="w-5 h-5 rounded mt-0.5 accent-amber-400 cursor-pointer" 
                  />
                  <label htmlFor="commitCheck" className="text-xs text-neutral-300 leading-relaxed cursor-pointer select-none">
                    <span className="font-bold text-white">Cam kết thông tin:</span> Tôi cam kết đây là những thông tin thật từ tôi, phục vụ cho mục đích ghép đội nghiêm túc và tôn trọng thời gian của bạn đồng hành.
                  </label>
                </div>

                <div className="pt-2">
                  <button 
                    disabled={!isCommitted} 
                    onClick={() => setIsSubmittedSuccess(true)} 
                    className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-sm text-stone-900 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={18} /> Đồng ý gửi & Bắt đầu ghép cặp (Submit)
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#161820] border border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center space-y-5 shadow-2xl animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={36} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Hồ sơ đã được tiếp nhận thành công!</h2>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Chúng tôi sẽ đối soát hồ sơ và gửi thông báo ghép cặp kèm thông tin bạn đồng hành cá nhân hóa đến hòm thư trường của bạn lúc <b>7:00 tối Chủ Nhật</b>.
                  </p>
                </div>
                
                <div className="inline-flex items-center gap-2 bg-[#1C1F26] px-4 py-2 rounded-xl text-xs text-neutral-300 border border-white/5">
                  <Mail size={16} className="text-amber-400" />
                  <span>Vui lòng kiểm tra email của bạn thường xuyên</span>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setCurrentView('dashboard')} 
                    className="px-8 py-3 bg-white text-black font-bold text-xs rounded-full hover:bg-neutral-200 transition-all shadow-md active:scale-95"
                  >
                    Vào Dashboard khám phá cuộc thi →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================= VIEW 4: PREMIUM DASHBOARD ================= */
        <div className="min-h-screen bg-[#0E1015] text-white">
          <header className="sticky top-0 z-40 bg-[#0E1015]/80 backdrop-blur-lg border-b border-white/5 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <span className="text-2xl font-cooper italic text-white drop-shadow">Jobbod</span>
            </div>
            
            <div className="hidden md:flex relative w-96">
              <Search className="absolute left-3 top-2.5 text-neutral-500" size={16} />
              <input type="text" placeholder={t.dbNavSearch} className="w-full bg-[#1C1F26] border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 transition-colors text-white" />
            </div>

            <div className="flex items-center gap-4">
              <button onClick={toggleLanguage} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[11px] font-bold border border-white/5 transition-colors">
                <Globe size={14} /> {lang === 'vi' ? 'VIE' : 'ENG'}
              </button>
              <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-[#0E1015]"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-amber-400 p-[2px] cursor-pointer">
                <div className="w-full h-full rounded-full bg-[#161820] flex items-center justify-center text-xs font-bold text-amber-300">
                  TH
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="w-full rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900/80 to-stone-950 border border-amber-400/20 p-8 md:p-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-4 max-w-xl z-10">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <Sparkles size={14}/> Adam Matchmaker
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{t.dbBannerTitle}</h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {t.dbBannerDesc}
                </p>
              </div>
              <button onClick={() => openAiMatchFor(HACKATHONS_DATA[0])} className="z-10 bg-amber-400 text-stone-900 px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-amber-300 active:scale-95 transition-all whitespace-nowrap shadow-lg">
                {t.dbTurnOnAi}
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-4">
              <div className="flex gap-6 text-sm font-semibold">
                <button className={`pb-4 border-b-2 transition-colors ${dbTab === 'all' ? 'border-amber-400 text-amber-300' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`} onClick={() => setDbTab('all')}>
                  {t.dbExplore}
                </button>
                <button className={`pb-4 border-b-2 transition-colors ${dbTab === 'myteams' ? 'border-amber-400 text-amber-300' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`} onClick={() => setDbTab('myteams')}>
                  {t.dbMyTeams}
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
                <button className="whitespace-nowrap px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors">
                  {t.dbFilterAll}
                </button>
                <button className="whitespace-nowrap px-4 py-2 rounded-xl bg-transparent border border-white/10 text-neutral-400 text-xs font-medium hover:text-white transition-colors">
                  {t.dbFilterOpenNow}
                </button>
                <button className="whitespace-nowrap px-4 py-2 rounded-xl bg-transparent border border-white/10 text-neutral-400 text-xs font-medium hover:text-white transition-colors">
                  {t.dbFilterUp}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-xs text-neutral-400 mb-4">{t.dbShowing} <b>{HACKATHONS_DATA.length}</b> {t.dbCompsLooking}</div>
              
              {HACKATHONS_DATA.map((item) => (
                <div key={item.id} className="group relative bg-[#12141A] border border-white/5 rounded-3xl p-5 hover:border-amber-400/30 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center shadow-lg">
                  <div className="relative w-full md:w-64 h-48 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold border border-white/10 text-white uppercase tracking-wider">
                      {item.status}
                    </div>
                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between h-full py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <span className="flex-shrink-0 text-xs text-amber-400 flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20 font-medium">
                          <Clock size={12} /> {item.deadline}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400 mt-2 flex items-center gap-1.5">
                        <MapPin size={14} className="text-neutral-500"/> {item.location} <span className="text-neutral-700">•</span> {item.organizer}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-6 gap-4">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-[11px] px-3 py-1.5 rounded-lg bg-[#1C1F26] border border-white/5 text-neutral-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-[#1C1F26] px-3 py-2 rounded-xl">
                          <Users size={14} className="text-amber-400" />
                          <span><b>{item.matchingCount}</b> tìm đội</span>
                        </div>
                        <button onClick={() => openAiMatchFor(item)} className="flex-1 md:flex-none px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md">
                          <Sparkles size={16} /> {t.dbFindWithAi}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* ================= MODAL ĐĂNG NHẬP ================= */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[3px] flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-stone-900 p-4 shadow-2xl border border-white/10 text-white animate-fadeIn">
            <div className="bg-[#161820] rounded-2xl p-5 space-y-4 border border-white/5">
              <div className="flex items-center justify-between">
                <button onClick={() => setShowLoginModal(false)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/5 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <span className="px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold text-xs">
                  {t.loginModalTitle}
                </span>
                <div className="w-8" />
              </div>
              <form onSubmit={handleLoginSubmit} className="space-y-3 pt-1">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs text-stone-300 font-medium pl-1">{t.loginModalInputLabel}</label>
                  <input 
                    type="text" 
                    value={loginInput} 
                    onChange={(e) => setLoginInput(e.target.value)} 
                    placeholder={t.loginModalInputLabel} 
                    className="w-full bg-[#1C1F26] text-white placeholder:text-stone-500 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 border border-white/10" 
                    required 
                  />
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs transition-all shadow-md active:scale-95">
                  {t.continueBtn}
                </button>
              </form>
              <div className="relative flex items-center justify-center py-1">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-[#161820] px-3 text-[11px] text-stone-500 font-semibold">{t.orText}</span>
                <div className="border-t border-white/10 w-full" />
              </div>
              <div className="space-y-2 pt-0.5">
                <button onClick={() => { setShowLoginModal(false); setCurrentView('dashboard'); }} className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all active:scale-95">
                  <Globe size={14} className="text-amber-400" /> <span>{t.loginWithGoogle}</span>
                </button>
                <div className="text-[11px] text-stone-400 text-center">
                  {t.noAccount} <span onClick={() => { setShowLoginModal(false); setCurrentView('onboarding_step1'); }} className="text-amber-300 font-bold underline cursor-pointer hover:text-amber-200">{t.signUp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL THÔNG TIN FOOTER ================= */}
      {infoModalType && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#16171B] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white animate-fadeIn max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#12141A]">
              <div className="flex items-center gap-2.5">
                {infoModalType === 'guide' && <BookMarked className="text-amber-400" size={20} />}
                {infoModalType === 'manifesto' && <Award className="text-amber-400" size={20} />}
                {infoModalType === 'campuses' && <School className="text-amber-400" size={20} />}
                {infoModalType === 'terms' && <ShieldCheck className="text-amber-400" size={20} />}
                <h3 className="font-bold text-base">
                  {infoModalType === 'guide' && "Cẩm nang ghép cặp cùng Adam"}
                  {infoModalType === 'manifesto' && "Tuyên ngôn sứ mệnh của Jobbod"}
                  {infoModalType === 'campuses' && "Mạng lưới trường Đại học đối tác"}
                  {infoModalType === 'terms' && "Điều khoản & Bảo mật sinh viên"}
                </h3>
              </div>
              <button 
                onClick={() => setInfoModalType(null)} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-neutral-300"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-neutral-300">
              {infoModalType === 'guide' && (
                <>
                  <div className="p-4 rounded-2xl bg-[#1C1F26] border border-white/5 space-y-1.5">
                    <h4 className="font-bold text-amber-300 text-sm">1. Thiết lập Career DNA (Thứ 2 - Thứ 6)</h4>
                    <p>Hoàn thành hồ sơ cơ bản và trò chuyện 2 phút cùng AI Adam để hệ thống bóc tách phong cách cày deadline, kỹ năng tự tin nhất và điểm hẹn offline yêu thích.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#1C1F26] border border-white/5 space-y-1.5">
                    <h4 className="font-bold text-amber-300 text-sm">2. The Sunday Drop (19:00 Chủ Nhật)</h4>
                    <p>Hệ thống tự động kích hoạt ghép cặp thuật toán và gửi email thông tin bạn đồng hành bù trừ kỹ năng chuẩn gu nhất đến hòm thư trường của bạn.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#1C1F26] border border-white/5 space-y-1.5">
                    <h4 className="font-bold text-amber-300 text-sm">3. Cuộc hẹn Cafe O2O An Toàn</h4>
                    <p>Cả hai cùng nhận được gợi ý quán cà phê đối tác gần trường để gặp mặt, bàn chiến thuật thi đấu và phân chia công việc trong không gian mở an toàn 100%.</p>
                  </div>
                </>
              )}

              {infoModalType === 'manifesto' && (
                <>
                  <p className="text-sm font-semibold text-white">Chúng tôi tin rằng: Không sinh viên nào xứng đáng phải "gánh team một mình" trong cô độc.</p>
                  <p>Hàng ngày, hàng ngàn sinh viên tài năng phải lướt qua hàng trăm bài đăng vô vọng trên mạng xã hội chỉ để tìm một người bạn cùng chí hướng làm đồ án hoặc đi thi Hackathon.</p>
                  <p className="border-l-2 border-amber-400 pl-3 italic text-stone-300">
                    "Jobbod ra đời để thay thế sự hỗn loạn đó bằng một chuẩn mực ghép cặp văn minh, khoa học và an toàn. Nơi mà kỹ năng của bạn tìm thấy mảnh ghép còn thiếu, và những cuộc trò chuyện rơi vào im lặng sẽ được thay bằng những cái bắt tay thực chiến ngoài đời thực."
                  </p>
                  <p>Mỗi tuần một người đồng đội chất lượng. Không lướt dạo. Không giả tạo.</p>
                </>
              )}

              {infoModalType === 'campuses' && (
                <>
                  <p className="text-xs text-neutral-400">Các trường đại học đã chính thức hỗ trợ xác minh email sinh viên và thiết lập điểm hẹn đối tác:</p>
                  <div className="space-y-2.5 pt-1">
                    {CAMPUSES.map((c, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#1C1F26] p-3 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                            {i+1}
                          </div>
                          <span className="font-semibold text-white">{c.name}</span>
                        </div>
                        <span className="text-[11px] text-emerald-400 font-medium">{c.students}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {infoModalType === 'terms' && (
                <>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-white mb-1">1. Cam kết danh tính chính chủ</h4>
                      <p>Mọi tài khoản phải được xác thực qua email trường hoặc hồ sơ sinh viên hợp lệ. Hành vi mạo danh hoặc gây rối trong quá trình ghép cặp sẽ bị khóa tài khoản vĩnh viễn.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">2. Bảo vệ sự riêng tư</h4>
                      <p>Thông tin cá nhân (Email, liên kết mạng xã hội, số điện thoại) chỉ được mở khóa cho người đồng đội duy nhất được ghép cặp thành công vào Chủ Nhật hàng tuần.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">3. Văn hóa gặp mặt O2O</h4>
                      <p>Khuyến khích các bạn sinh viên gặp gỡ tại các không gian công cộng (quán cà phê, sảnh trường, thư viện) để đảm bảo trải nghiệm an toàn và hiệu quả nhất.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-[#12141A] flex justify-end">
              <button 
                onClick={() => setInfoModalType(null)} 
                className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs transition-colors"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL AI MATCHING CHAT ================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl h-[85vh] bg-[#16171B] border border-white/20 rounded-3xl flex flex-col overflow-hidden shadow-2xl text-white">
            <div className="p-4 px-6 border-b border-white/10 bg-[#111215] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center shadow-sm font-bold">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Adam AI Assistant</h3>
                  <p className="text-[11px] text-neutral-400 truncate max-w-[280px]">{t.chatMatchFor} {selectedHackathon?.title}</p>
                </div>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-1"><Bot size={14} className="text-amber-300" /></div>
                  )}
                  <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'bg-amber-400 text-stone-900 p-3.5 rounded-2xl rounded-tr-none text-xs leading-relaxed shadow-md font-medium' : 'bg-neutral-800/90 border border-white/10 p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed text-neutral-200'}`}>
                    <p>{msg.text}</p>
                    {msg.dna && (
                      <div className="p-3 rounded-xl bg-black/40 border border-amber-400/30 space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1"><Sparkles size={12} /> Khởi tạo Career DNA</span>
                          <span className="text-[10px] text-neutral-400 uppercase font-semibold">{msg.dna.role}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {msg.dna.skills.map((s, i) => (<span key={i} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-neutral-300">{s}</span>))}
                        </div>
                        <p className="text-[10px] text-neutral-400"><b className="text-neutral-300">Phong cách:</b> {msg.dna.vibe}</p>
                      </div>
                    )}
                    {msg.suggestedTeams && msg.suggestedTeams.map((team) => (
                      <div key={team.id} className="p-3.5 rounded-xl bg-[#111215] border border-amber-400/30 space-y-3 mt-2">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <div>
                            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Gợi ý ghép cặp bù trừ</span>
                            <span className="text-[11px] font-semibold text-white">{team.roleNeeded}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 font-bold text-[10px]">{team.matchRate} Tương thích</span>
                        </div>
                        <div className="space-y-1.5">
                          {team.members.map((m, idx) => (
                            <div key={idx} className="flex items-center justify-between text-[11px] bg-white/5 p-1.5 rounded-lg">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-[9px] font-bold">{m.avatar}</div>
                                <span className="font-medium text-white">{m.name}</span>
                                <span className="text-neutral-400 text-[10px]">({m.school})</span>
                              </div>
                              <span className="text-neutral-300 text-[10px]">{m.role}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] text-neutral-400 flex items-center gap-1.5 bg-black/40 p-2 rounded-lg border border-white/5">
                          <MapPin size={12} className="text-amber-400 flex-shrink-0" />
                          <span><b>Gợi ý O2O:</b> {team.cafeSuggest}</span>
                        </div>
                        {confirmedMatch === team.id ? (
                          <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-semibold text-[11px] flex items-center justify-center gap-1.5">
                            <Check size={14} /> Đã gửi yêu cầu kết nối & Lên lịch gặp!
                          </div>
                        ) : (
                          <button onClick={() => setConfirmedMatch(team.id)} className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-300 font-semibold text-[11px] text-stone-900 transition-all shadow-md active:scale-95">
                            Xác thực sinh viên & Mở kết nối
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-neutral-400 italic">
                  <Bot size={14} className="animate-spin text-amber-400" /> {t.chatLoading}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-white/10 bg-[#111215] space-y-2">
              <div className="flex items-center gap-2">
                <button onClick={() => setShowLinkModal(true)} className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-neutral-300 flex items-center gap-1 transition-all"><LinkIcon size={12} /> {t.chatPasteLink}</button>
                <button onClick={() => setShowQrModal(true)} className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-neutral-300 flex items-center gap-1 transition-all"><QrCode size={12} /> {t.chatScanQR}</button>
              </div>
              <div className="flex items-center gap-2">
                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={t.chatInput} className="flex-1 bg-[#18191E] border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 placeholder:text-neutral-500 text-white" />
                <button onClick={() => handleSendMessage()} disabled={!inputMessage.trim()} className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 disabled:opacity-40 transition-all active:scale-95"><Send size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL QUÉT QR ================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#16171B] border border-white/20 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl text-white">
            <h4 className="font-bold text-base">{t.qrTitle}</h4>
            <div className="w-52 h-52 mx-auto rounded-2xl border-2 border-dashed border-amber-400 relative flex items-center justify-center bg-black/50 overflow-hidden">
              <Camera size={40} className="text-neutral-600" />
              {isScanning && (<div className="absolute inset-x-0 h-1 bg-amber-400 animate-pulse top-1/2 shadow-lg shadow-amber-400" />)}
            </div>
            <p className="text-xs text-neutral-400">{isScanning ? t.qrReading : t.qrDesc}</p>
            <div className="flex gap-2">
              <button onClick={() => setShowQrModal(false)} className="flex-1 py-2 rounded-xl bg-neutral-800 text-xs font-semibold hover:bg-neutral-700 transition-colors">{t.obCancel}</button>
              <button onClick={handleScanQR} disabled={isScanning} className="flex-1 py-2 rounded-xl bg-amber-400 text-stone-900 text-xs font-bold hover:bg-amber-300 transition-colors disabled:opacity-50">{isScanning ? t.qrScanning : t.qrStart}</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL NHẬP LINK CV ================= */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#16171B] border border-white/20 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl text-white">
            <h4 className="font-bold text-base">{t.linkTitle}</h4>
            <input type="url" value={cvLinkInput} onChange={(e) => setCvLinkInput(e.target.value)} placeholder={t.linkInput} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 text-white" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowLinkModal(false)} className="px-4 py-2 rounded-xl bg-neutral-800 text-xs font-semibold hover:bg-neutral-700 transition-colors">{t.obCancel}</button>
              <button onClick={handleExtractLink} className="px-4 py-2 rounded-xl bg-amber-400 text-stone-900 text-xs font-bold hover:bg-amber-300 transition-colors">{t.linkExtract}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}