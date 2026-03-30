import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { RetroCard } from "@/components/RetroCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  Brain, Trophy, RefreshCw, ChevronRight, CheckCircle, XCircle, 
  Send, Sparkles, Flame, Skull, Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Difficulty = "Easy" | "Core" | "Hardcore" | "Nuclear";
type QuizState = "start" | "playing" | "result";

interface Question {
  id: number;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
  difficulty: Difficulty;
}

const allQuestions: Question[] = [
  // EASY (50 questions)
  { id: 1, question: "What is the full form of IIT BHU?", options: { A: "Indian Institute of Technology Banaras Hindu University", B: "Indian Institute of Talent Banaras Hindu University", C: "International Institute of Technology BHU", D: "None of these" }, answer: "A", difficulty: "Easy" },
  { id: 2, question: "IIT BHU is located in which city?", options: { A: "Delhi", B: "Varanasi", C: "Lucknow", D: "Patna" }, answer: "B", difficulty: "Easy" },
  { id: 3, question: "What is the main river flowing near Varanasi?", options: { A: "Yamuna", B: "Ganga", C: "Godavari", D: "Narmada" }, answer: "B", difficulty: "Easy" },
  { id: 4, question: "What is the famous snack you eat at Lanka?", options: { A: "Pizza", B: "Chaat", C: "Burger", D: "Momos" }, answer: "B", difficulty: "Easy" },
  { id: 5, question: "Which gate is nearest to Lanka market?", options: { A: "Main Gate", B: "Trauma Gate", C: "Lanka Gate", D: "All of these" }, answer: "C", difficulty: "Easy" },
  { id: 6, question: "What do hostels serve for breakfast most days?", options: { A: "Poori Sabzi", B: "Pasta", C: "Dosa", D: "Biryani" }, answer: "A", difficulty: "Easy" },
  { id: 7, question: "BHU stands for?", options: { A: "Banaras Hindu University", B: "Bihar Hindu University", C: "Bombay Hindu University", D: "None" }, answer: "A", difficulty: "Easy" },
  { id: 8, question: "Which is the famous temple inside BHU campus?", options: { A: "Kashi Vishwanath", B: "Birla Temple", C: "Sankat Mochan", D: "Tulsi Manas" }, answer: "B", difficulty: "Easy" },
  { id: 9, question: "What is the local name for evening hangout at Lanka?", options: { A: "Ghumna", B: "LC", C: "Adda", D: "Timepass" }, answer: "A", difficulty: "Easy" },
  { id: 10, question: "What is a common exam night drink?", options: { A: "Lassi", B: "Chai", C: "Coffee", D: "Cold Drink" }, answer: "B", difficulty: "Easy" },
  { id: 11, question: "What is the famous Banaras sweet?", options: { A: "Rasgulla", B: "Jalebi", C: "Laddoo", D: "Malaiyo" }, answer: "D", difficulty: "Easy" },
  { id: 12, question: "Which ghat is famous for Ganga Aarti?", options: { A: "Assi Ghat", B: "Dashashwamedh Ghat", C: "Manikarnika Ghat", D: "Harishchandra Ghat" }, answer: "B", difficulty: "Easy" },
  { id: 13, question: "What does 'Lanka' refer to?", options: { A: "A country", B: "A demon's kingdom", C: "Market area near IIT BHU", D: "A restaurant" }, answer: "C", difficulty: "Easy" },
  { id: 14, question: "What is the most common mode of transport in Banaras?", options: { A: "Metro", B: "Auto/E-rickshaw", C: "Bus", D: "Helicopter" }, answer: "B", difficulty: "Easy" },
  { id: 15, question: "Which festival is celebrated grandly in Banaras?", options: { A: "Christmas", B: "Dev Deepawali", C: "Easter", D: "Halloween" }, answer: "B", difficulty: "Easy" },
  { id: 16, question: "What is Banarasi Paan famous for?", options: { A: "Bitter taste", B: "Sweet and fresh taste", C: "Spicy taste", D: "No taste" }, answer: "B", difficulty: "Easy" },
  { id: 17, question: "IIT BHU was earlier known as?", options: { A: "IT BHU", B: "BENCO", C: "NIT", D: "BIT" }, answer: "A", difficulty: "Easy" },
  { id: 18, question: "What is the typical hostel room called?", options: { A: "Suite", B: "Wing", C: "Room", D: "Cubicle" }, answer: "C", difficulty: "Easy" },
  { id: 19, question: "What is 'Technex'?", options: { A: "A software", B: "Tech fest of IIT BHU", C: "A restaurant", D: "A hostel" }, answer: "B", difficulty: "Easy" },
  { id: 20, question: "What is 'Kashiyatra'?", options: { A: "A pilgrimage", B: "Cultural fest of IIT BHU", C: "A music band", D: "A book" }, answer: "B", difficulty: "Easy" },
  { id: 21, question: "What does 'proxy' mean in college context?", options: { A: "A server", B: "Fake attendance", C: "A friend", D: "A course" }, answer: "B", difficulty: "Easy" },
  { id: 22, question: "What is 'maggi' for a hosteler?", options: { A: "Just noodles", B: "Life support system", C: "A brand", D: "A punishment" }, answer: "B", difficulty: "Easy" },
  { id: 23, question: "What time does mess usually serve dinner?", options: { A: "5 PM", B: "7-9 PM", C: "11 PM", D: "3 AM" }, answer: "B", difficulty: "Easy" },
  { id: 24, question: "Which is NOT a hostel in IIT BHU?", options: { A: "Morvi", B: "Rajputana", C: "Limdi", D: "Nirvana" }, answer: "D", difficulty: "Easy" },
  { id: 25, question: "What is a 'night canteen' famous for?", options: { A: "Fine dining", B: "Late night snacks", C: "Breakfast", D: "Nothing" }, answer: "B", difficulty: "Easy" },
  { id: 26, question: "What river view do some hostels have?", options: { A: "Yamuna", B: "Ganga", C: "Godavari", D: "None" }, answer: "B", difficulty: "Easy" },
  { id: 27, question: "What is 'ragging' officially in IIT BHU?", options: { A: "Welcome tradition", B: "Strictly banned", C: "Encouraged", D: "Optional" }, answer: "B", difficulty: "Easy" },
  { id: 28, question: "What is the typical duration of a B.Tech program?", options: { A: "3 years", B: "4 years", C: "5 years", D: "2 years" }, answer: "B", difficulty: "Easy" },
  { id: 29, question: "Which exam gets you into IIT BHU?", options: { A: "NEET", B: "JEE Advanced", C: "CAT", D: "GATE" }, answer: "B", difficulty: "Easy" },
  { id: 30, question: "What is 'bhang' famous for in Banaras?", options: { A: "A food item", B: "Legal intoxicant during Holi", C: "A festival", D: "A dance form" }, answer: "B", difficulty: "Easy" },
  { id: 31, question: "What do students do on Sunday mornings?", options: { A: "Study", B: "Sleep till noon", C: "Gym", D: "Classes" }, answer: "B", difficulty: "Easy" },
  { id: 32, question: "What is Vishwanath temple also known as?", options: { A: "Kashi Vishwanath", B: "BHU Temple", C: "New Vishwanath", D: "All of these" }, answer: "D", difficulty: "Easy" },
  { id: 33, question: "What is the primary language spoken in Banaras?", options: { A: "Bengali", B: "Hindi/Bhojpuri", C: "Tamil", D: "Marathi" }, answer: "B", difficulty: "Easy" },
  { id: 34, question: "What is 'hostel day'?", options: { A: "A holiday", B: "Annual hostel celebration", C: "Moving out day", D: "Exam day" }, answer: "B", difficulty: "Easy" },
  { id: 35, question: "What is the nearest airport to Varanasi?", options: { A: "Lal Bahadur Shastri Airport", B: "IGI Delhi", C: "Mumbai Airport", D: "Patna Airport" }, answer: "A", difficulty: "Easy" },
  { id: 36, question: "What is 'gyaan' in college slang?", options: { A: "Knowledge/lecture", B: "A subject", C: "Food", D: "Sleep" }, answer: "A", difficulty: "Easy" },
  { id: 37, question: "What is the common nickname for professors?", options: { A: "Sir/Ma'am", B: "Prof", C: "Guru", D: "All of these" }, answer: "D", difficulty: "Easy" },
  { id: 38, question: "What is 'backlog'?", options: { A: "Wood pieces", B: "Failed subjects to clear", C: "A type of log", D: "A game" }, answer: "B", difficulty: "Easy" },
  { id: 39, question: "Which is the main road near IIT BHU?", options: { A: "MG Road", B: "Lanka Road", C: "Ring Road", D: "Highway" }, answer: "B", difficulty: "Easy" },
  { id: 40, question: "What is 'mass bunk'?", options: { A: "A bed type", B: "Entire class skipping lecture", C: "A punishment", D: "A reward" }, answer: "B", difficulty: "Easy" },
  { id: 41, question: "What is the student council called?", options: { A: "Gymkhana", B: "Parliament", C: "Council", D: "Board" }, answer: "A", difficulty: "Easy" },
  { id: 42, question: "What is 'viva'?", options: { A: "A dance", B: "Oral examination", C: "A song", D: "A dish" }, answer: "B", difficulty: "Easy" },
  { id: 43, question: "What do students call the library?", options: { A: "LHC", B: "Central Library", C: "Lib", D: "All of these" }, answer: "D", difficulty: "Easy" },
  { id: 44, question: "What is 'placement season'?", options: { A: "Gardening time", B: "Job recruitment period", C: "Exam time", D: "Vacation" }, answer: "B", difficulty: "Easy" },
  { id: 45, question: "What is the dress code in IIT BHU?", options: { A: "Formal only", B: "No strict code", C: "Uniform", D: "Traditional only" }, answer: "B", difficulty: "Easy" },
  { id: 46, question: "What is 'branch change'?", options: { A: "Changing trees", B: "Switching engineering department", C: "A bank service", D: "None" }, answer: "B", difficulty: "Easy" },
  { id: 47, question: "What is the famous silk from Banaras called?", options: { A: "Kanjeevaram", B: "Banarasi Silk", C: "Mysore Silk", D: "Pochampally" }, answer: "B", difficulty: "Easy" },
  { id: 48, question: "What is 'semester'?", options: { A: "A type of exam", B: "Half-year academic term", C: "A holiday", D: "A course" }, answer: "B", difficulty: "Easy" },
  { id: 49, question: "What is 'CGPA'?", options: { A: "Central Govt Pay Act", B: "Cumulative Grade Point Average", C: "College Grade Point Assessment", D: "None" }, answer: "B", difficulty: "Easy" },
  { id: 50, question: "What is the typical hostel fee structure?", options: { A: "Free", B: "Nominal/Subsidized", C: "Very expensive", D: "Pay per use" }, answer: "B", difficulty: "Easy" },

  // CORE (60 questions)
  { id: 51, question: "What is 'LC' short for in IIT BHU lingo?", options: { A: "Letter of Credit", B: "Lanka Chauraha", C: "Library Corner", D: "Left Center" }, answer: "B", difficulty: "Core" },
  { id: 52, question: "What is 'Orchid' famous for?", options: { A: "Flowers", B: "Ice cream and hangout spot", C: "A hostel", D: "A professor" }, answer: "B", difficulty: "Core" },
  { id: 53, question: "What does 'HG' stand for near hostels?", options: { A: "High Ground", B: "Hostel Ground/Gate shop", C: "Help Group", D: "Holy Ground" }, answer: "B", difficulty: "Core" },
  { id: 54, question: "What is 'Satkaar Dhaba' known for?", options: { A: "Pizza", B: "Affordable parathas and chai", C: "Italian food", D: "Sushi" }, answer: "B", difficulty: "Core" },
  { id: 55, question: "What is the famous chai near Lanka called?", options: { A: "Starbucks", B: "LC Chai", C: "Cafe Coffee Day", D: "Barista" }, answer: "B", difficulty: "Core" },
  { id: 56, question: "Which hostel is known for being the oldest?", options: { A: "Morvi", B: "Limdi", C: "Vishwakarma", D: "CV Raman" }, answer: "A", difficulty: "Core" },
  { id: 57, question: "What is 'Assi Ghat' famous for among students?", options: { A: "Cremation", B: "Morning walks and evening hangouts", C: "Shopping", D: "Classes" }, answer: "B", difficulty: "Core" },
  { id: 58, question: "What time does the hostel main gate typically close?", options: { A: "6 PM", B: "11 PM", C: "Never", D: "5 PM" }, answer: "B", difficulty: "Core" },
  { id: 59, question: "What is 'mugging' in student slang?", options: { A: "Robbery", B: "Intense studying", C: "Drinking", D: "Sleeping" }, answer: "B", difficulty: "Core" },
  { id: 60, question: "What is 'Seer Gate' known for?", options: { A: "Security", B: "Street food and auto stands", C: "Gardens", D: "Nothing" }, answer: "B", difficulty: "Core" },
  { id: 61, question: "What is the typical hostel 'ragging' alternative now?", options: { A: "Interaction", B: "Nothing", C: "Punishment", D: "Silence" }, answer: "A", difficulty: "Core" },
  { id: 62, question: "What is 'night out' for IITians?", options: { A: "Partying", B: "Studying all night before exams", C: "Sleeping", D: "Travelling" }, answer: "B", difficulty: "Core" },
  { id: 63, question: "What does 'frust' mean in hostel lingo?", options: { A: "First", B: "Frustrated", C: "Fresh", D: "Fast" }, answer: "B", difficulty: "Core" },
  { id: 64, question: "What is 'Pondi' short for?", options: { A: "Pondicherry", B: "A senior's nickname", C: "A place", D: "A course" }, answer: "B", difficulty: "Core" },
  { id: 65, question: "Which hostel has the best mess food (allegedly)?", options: { A: "All same", B: "Depends who you ask", C: "None", D: "Limdi" }, answer: "B", difficulty: "Core" },
  { id: 66, question: "What is 'internship ki tension'?", options: { A: "A yoga pose", B: "Pre-placement stress", C: "A course", D: "A game" }, answer: "B", difficulty: "Core" },
  { id: 67, question: "What is 'CGPA pe dhyan de' advice for?", options: { A: "Sports", B: "Academics", C: "Food", D: "Sleep" }, answer: "B", difficulty: "Core" },
  { id: 68, question: "What is the typical 'first year' hostel experience?", options: { A: "Boring", B: "Adjusting to new life", C: "Easy", D: "None" }, answer: "B", difficulty: "Core" },
  { id: 69, question: "What is 'mass proxy' disaster?", options: { A: "Getting caught during fake attendance", B: "A game", C: "A success", D: "A party" }, answer: "A", difficulty: "Core" },
  { id: 70, question: "What is the railway station near Varanasi called?", options: { A: "Varanasi Junction", B: "Mughal Sarai", C: "Both exist", D: "Neither" }, answer: "C", difficulty: "Core" },
  { id: 71, question: "What is 'Maidaan' in campus?", options: { A: "A building", B: "Sports ground", C: "A hostel", D: "A cafe" }, answer: "B", difficulty: "Core" },
  { id: 72, question: "What is 'wing' in hostel context?", options: { A: "Bird part", B: "Section of hostel floor", C: "A dance", D: "Food" }, answer: "B", difficulty: "Core" },
  { id: 73, question: "What is 'night canteen ka maggi'?", options: { A: "Terrible", B: "Survival food at 2 AM", C: "Breakfast", D: "Lunch" }, answer: "B", difficulty: "Core" },
  { id: 74, question: "What is 'GPO' in Varanasi?", options: { A: "General Post Office", B: "Great Place Outside", C: "Government Office", D: "A mall" }, answer: "A", difficulty: "Core" },
  { id: 75, question: "What is 'Godowlia' famous for?", options: { A: "Temples", B: "Shopping and chaos", C: "Peace", D: "Nothing" }, answer: "B", difficulty: "Core" },
  { id: 76, question: "What is 'half semester' exam called?", options: { A: "Finals", B: "Midsem", C: "Quiz", D: "Viva" }, answer: "B", difficulty: "Core" },
  { id: 77, question: "What is 'endsem' dread?", options: { A: "A monster", B: "Fear of final exams", C: "A party", D: "A holiday" }, answer: "B", difficulty: "Core" },
  { id: 78, question: "What is 'attendance shortage'?", options: { A: "A disease", B: "Not enough classes attended", C: "Too many classes", D: "A reward" }, answer: "B", difficulty: "Core" },
  { id: 79, question: "What is 'lab file' stress?", options: { A: "Filing cabinets", B: "Completing practical records", C: "A game", D: "Relaxation" }, answer: "B", difficulty: "Core" },
  { id: 80, question: "What is 'tutorial' in IIT context?", options: { A: "YouTube video", B: "Problem-solving class", C: "A movie", D: "Sleep time" }, answer: "B", difficulty: "Core" },
  { id: 81, question: "What does 'DC' mean for students?", options: { A: "Direct Current", B: "Disciplinary Committee", C: "Dance Club", D: "Dinner Counter" }, answer: "B", difficulty: "Core" },
  { id: 82, question: "What is 'sencha' in hostel lingo?", options: { A: "Tea type", B: "Senior ka chamcha", C: "A game", D: "Food" }, answer: "B", difficulty: "Core" },
  { id: 83, question: "What is 'Kela' slang for?", options: { A: "Banana", B: "Getting fooled/rejected", C: "A fruit", D: "Success" }, answer: "B", difficulty: "Core" },
  { id: 84, question: "What is 'DSW' office for?", options: { A: "Dean of Student Welfare", B: "Dance Society Wing", C: "Dining Service Wing", D: "None" }, answer: "A", difficulty: "Core" },
  { id: 85, question: "What is 'sutta' code for?", options: { A: "Sweater", B: "Cigarette", C: "Study", D: "Sleep" }, answer: "B", difficulty: "Core" },
  { id: 86, question: "What is 'package' obsession about?", options: { A: "Courier", B: "Placement salary", C: "Gift", D: "Food" }, answer: "B", difficulty: "Core" },
  { id: 87, question: "What is 'POR' in resume?", options: { A: "Position of Responsibility", B: "Point of Reference", C: "Place of Rest", D: "None" }, answer: "A", difficulty: "Core" },
  { id: 88, question: "What is 'mess ka khana' generally like?", options: { A: "5-star quality", B: "Edible but complained about", C: "Michelin star", D: "Perfect" }, answer: "B", difficulty: "Core" },
  { id: 89, question: "What is 'dabba' system?", options: { A: "Lunch box delivery", B: "A game", C: "A punishment", D: "A dance" }, answer: "A", difficulty: "Core" },
  { id: 90, question: "What is 'Rajputana' hostel known for?", options: { A: "Being new", B: "Heritage architecture", C: "Small rooms", D: "Nothing" }, answer: "B", difficulty: "Core" },
  { id: 91, question: "What is 'Vishwakarma' hostel named after?", options: { A: "A god", B: "A person", C: "A place", D: "Random" }, answer: "A", difficulty: "Core" },
  { id: 92, question: "What is 'faccha' slang for?", options: { A: "Face", B: "First year student", C: "Faculty", D: "Fact" }, answer: "B", difficulty: "Core" },
  { id: 93, question: "What is 'thirdies' slang for?", options: { A: "Third floor", B: "Third year students", C: "Third meal", D: "Nothing" }, answer: "B", difficulty: "Core" },
  { id: 94, question: "What is 'CV Raman' hostel named after?", options: { A: "A scientist", B: "A god", C: "A place", D: "A politician" }, answer: "A", difficulty: "Core" },
  { id: 95, question: "What is 'Limdi' hostel's claim to fame?", options: { A: "Haunted", B: "Good location", C: "Big rooms", D: "Nothing special" }, answer: "B", difficulty: "Core" },
  { id: 96, question: "What is 'Gaura' hostel for?", options: { A: "Boys", B: "Girls", C: "Faculty", D: "Staff" }, answer: "B", difficulty: "Core" },
  { id: 97, question: "What is 'IHC' in campus?", options: { A: "International Hockey Cup", B: "Institute Health Center", C: "Indoor Hockey Court", D: "None" }, answer: "B", difficulty: "Core" },
  { id: 98, question: "What is 'SAC' building for?", options: { A: "Students Activity Center", B: "Science and Commerce", C: "Staff Accommodation", D: "None" }, answer: "A", difficulty: "Core" },
  { id: 99, question: "What is 'LHC' in campus context?", options: { A: "Large Hadron Collider", B: "Lecture Hall Complex", C: "Library Hall Center", D: "None" }, answer: "B", difficulty: "Core" },
  { id: 100, question: "What is 'swimming pool politics'?", options: { A: "Actual swimming", B: "Debate about pool access/timing", C: "A game", D: "None" }, answer: "B", difficulty: "Core" },
  { id: 101, question: "What is 'hostel elections' drama about?", options: { A: "National elections", B: "Choosing hostel representatives", C: "Sports", D: "Nothing" }, answer: "B", difficulty: "Core" },
  { id: 102, question: "What is 'Anup Bhaiyya' famous for?", options: { A: "Being a professor", B: "A legendary campus figure/shop owner", C: "A student", D: "A ghost" }, answer: "B", difficulty: "Core" },
  { id: 103, question: "What is 'Pondi Baba' legend?", options: { A: "A religious figure", B: "A legendary senior/campus myth", C: "A tree", D: "A building" }, answer: "B", difficulty: "Core" },
  { id: 104, question: "What is 'night out ka peer pressure'?", options: { A: "Religious", B: "Staying up because friends are", C: "Exercise", D: "Sleep" }, answer: "B", difficulty: "Core" },
  { id: 105, question: "What is 'assignment copy' culture?", options: { A: "Printing", B: "Sharing homework answers", C: "Photography", D: "Art" }, answer: "B", difficulty: "Core" },
  { id: 106, question: "What is 'previous year question paper' called?", options: { A: "Bible", B: "Pyqs/Holy Grail", C: "Trash", D: "Nothing" }, answer: "B", difficulty: "Core" },
  { id: 107, question: "What is 'grade moderation' hope?", options: { A: "A prayer", B: "Curve boosting exam scores", C: "A course", D: "Nothing" }, answer: "B", difficulty: "Core" },
  { id: 108, question: "What is 'department ka permission'?", options: { A: "Easy to get", B: "Bureaucratic nightmare", C: "Automatic", D: "Free" }, answer: "B", difficulty: "Core" },
  { id: 109, question: "What is 'inter-IIT' sports?", options: { A: "Internal games", B: "Competition between IITs", C: "Board games", D: "Video games" }, answer: "B", difficulty: "Core" },
  { id: 110, question: "What is 'freshers' party' in hostel?", options: { A: "Punishment", B: "Welcome party for first years", C: "Farewell", D: "Nothing" }, answer: "B", difficulty: "Core" },

  // HARDCORE (60 questions)
  { id: 111, question: "What is the unofficial motto of hostel life?", options: { A: "Study hard", B: "Adjust karo", C: "Sleep well", D: "Eat healthy" }, answer: "B", difficulty: "Hardcore" },
  { id: 112, question: "Which HG shop has legendary chai?", options: { A: "None specific", B: "It varies by hostel", C: "All same", D: "Starbucks" }, answer: "B", difficulty: "Hardcore" },
  { id: 113, question: "What is 'gate 4' infamous for?", options: { A: "Security", B: "Late night escapes", C: "Gardens", D: "Nothing" }, answer: "B", difficulty: "Hardcore" },
  { id: 114, question: "What time does 'LC chai' taste best?", options: { A: "Morning", B: "Post-midnight", C: "Afternoon", D: "Never" }, answer: "B", difficulty: "Hardcore" },
  { id: 115, question: "What is 'DP' in hostel context?", options: { A: "Display Picture", B: "Double Proxy", C: "Dean's Permission", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 116, question: "What is 'patta' slang for?", options: { A: "Leaf", B: "Being caught red-handed", C: "A game", D: "Food" }, answer: "B", difficulty: "Hardcore" },
  { id: 117, question: "What is 'RR' in hostel slang?", options: { A: "Rolls Royce", B: "Rona-Dhona (crying)", C: "Rest Room", D: "Railway Reservation" }, answer: "B", difficulty: "Hardcore" },
  { id: 118, question: "What is the 'fountain area' meeting spot for?", options: { A: "Swimming", B: "Casual hangouts", C: "Classes", D: "Exams" }, answer: "B", difficulty: "Hardcore" },
  { id: 119, question: "What is 'Morvi mess' legendary for?", options: { A: "Great food", B: "Varied reviews depending on era", C: "5-star quality", D: "Nothing" }, answer: "B", difficulty: "Hardcore" },
  { id: 120, question: "What is 'Gandhi Bhawan' used for?", options: { A: "Sleeping", B: "Events and gatherings", C: "Food", D: "Nothing" }, answer: "B", difficulty: "Hardcore" },
  { id: 121, question: "What is the 'railway station chai' price debate about?", options: { A: "Too expensive", B: "Varies by vendor", C: "Free", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 122, question: "What is 'Mughal Sarai' now officially called?", options: { A: "Same", B: "Pt. Deen Dayal Upadhyaya Junction", C: "Varanasi Junction", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 123, question: "What is 'train mein proxy' legend?", options: { A: "Fake tickets", B: "Marking attendance while on train", C: "A game", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 124, question: "What is 'hostel ghost story' usually about?", options: { A: "Real ghosts", B: "Seniors scaring juniors", C: "Movies", D: "Books" }, answer: "B", difficulty: "Hardcore" },
  { id: 125, question: "What is 'exam hall seating' anxiety?", options: { A: "Comfort", B: "Who sits next for copying", C: "Temperature", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 126, question: "What is 'last bench' culture?", options: { A: "Punishment", B: "Freedom to sleep/chat", C: "Best view", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 127, question: "What is 'first bench' stereotype?", options: { A: "Cool", B: "Studious/sincere", C: "Lazy", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 128, question: "What is 'department outing' usually like?", options: { A: "Boring", B: "Varies wildly by department", C: "Same everywhere", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 129, question: "What is 'project partner' lottery?", options: { A: "Actual lottery", B: "Luck-based team formation", C: "A game", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 130, question: "What is 'presentation ka last slide' usually?", options: { A: "Summary", B: "Thank You + rushed Q&A", C: "Nothing", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 131, question: "What is 'viva mein professor ka mood'?", options: { A: "Always good", B: "Unpredictable lottery", C: "Always bad", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 132, question: "What is 'lab attendance' politics?", options: { A: "Simple", B: "Complex negotiations", C: "None", D: "Easy" }, answer: "B", difficulty: "Hardcore" },
  { id: 133, question: "What is 'Sarkari Naukri vs Startup' hostel debate?", options: { A: "Rare", B: "Common placement season topic", C: "Never", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 134, question: "What is 'IIM vs IIT' ego clash about?", options: { A: "Nothing", B: "Which is 'better'", C: "Sports", D: "Food" }, answer: "B", difficulty: "Hardcore" },
  { id: 135, question: "What is 'coding culture' in hostels now?", options: { A: "Dying", B: "Competitive programming obsession", C: "None", D: "Rare" }, answer: "B", difficulty: "Hardcore" },
  { id: 136, question: "What is 'DSA' obsession for placements?", options: { A: "Dance", B: "Data Structures and Algorithms", C: "Drama", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 137, question: "What is 'CGPA doesn't matter' cope?", options: { A: "True always", B: "Said by those with low CGPA", C: "False", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 138, question: "What is 'branch matters' for?", options: { A: "Nothing", B: "Placement opportunities", C: "Food", D: "Hostel" }, answer: "B", difficulty: "Hardcore" },
  { id: 139, question: "What is 'core vs non-core' placement divide?", options: { A: "Sports", B: "Engineering vs IT jobs", C: "Food", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 140, question: "What is 'day 1 company' obsession?", options: { A: "Calendar", B: "First placement day = best companies", C: "None", D: "Sports" }, answer: "B", difficulty: "Hardcore" },
  { id: 141, question: "What is 'PPO' the holy grail for?", options: { A: "Sports", B: "Pre-Placement Offer from internship", C: "Food", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 142, question: "What is 'resume shortlist' anxiety?", options: { A: "None", B: "Fear of not getting interview calls", C: "Excitement", D: "Sleep" }, answer: "B", difficulty: "Hardcore" },
  { id: 143, question: "What is 'HR round' nightmare usually?", options: { A: "Easy", B: "Behavioral questions trap", C: "Fun", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 144, question: "What is 'case study' prep for consulting?", options: { A: "Easy", B: "Intensive framework memorization", C: "None", D: "Fun" }, answer: "B", difficulty: "Hardcore" },
  { id: 145, question: "What is 'quant' prep for finance roles?", options: { A: "Easy", B: "Math puzzles and probability", C: "None", D: "Sports" }, answer: "B", difficulty: "Hardcore" },
  { id: 146, question: "What is 'product interview' prep like?", options: { A: "Easy", B: "PM frameworks and metrics", C: "None", D: "Sports" }, answer: "B", difficulty: "Hardcore" },
  { id: 147, question: "What is 'group discussion' elimination like?", options: { A: "Fair", B: "Survival of the loudest", C: "Fun", D: "Easy" }, answer: "B", difficulty: "Hardcore" },
  { id: 148, question: "What is 'stress interview' tactic?", options: { A: "Relaxing", B: "Deliberately pressuring candidate", C: "Fun", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 149, question: "What is 'lateral entry' in IIT?", options: { A: "Side door", B: "Joining through alternative exams", C: "Sports entry", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 150, question: "What is 'dual degree' pain?", options: { A: "None", B: "5 years instead of 4", C: "Easy", D: "Fun" }, answer: "B", difficulty: "Hardcore" },
  { id: 151, question: "What is 'PhD life' in IIT like?", options: { A: "Easy", B: "Research + teaching duties + low stipend", C: "Luxurious", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 152, question: "What is 'RA/TA' work for PhD students?", options: { A: "Nothing", B: "Research/Teaching Assistant duties", C: "Sports", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 153, question: "What is 'thesis submission' deadline chaos?", options: { A: "Calm", B: "Last minute panic always", C: "Easy", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 154, question: "What is 'conference paper' pressure?", options: { A: "None", B: "Publish or perish mentality", C: "Easy", D: "Fun" }, answer: "B", difficulty: "Hardcore" },
  { id: 155, question: "What is 'journal publication' struggle?", options: { A: "Easy", B: "Reviewer rejection trauma", C: "Fun", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 156, question: "What is 'lab vs hostel' time for PhD?", options: { A: "Balanced", B: "Mostly lab", C: "Mostly hostel", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 157, question: "What is 'guide relationship' crucial for?", options: { A: "Nothing", B: "PhD completion and mental health", C: "Sports", D: "Food" }, answer: "B", difficulty: "Hardcore" },
  { id: 158, question: "What is 'comprehensive exam' fear?", options: { A: "None", B: "PhD qualifying test anxiety", C: "Fun", D: "Easy" }, answer: "B", difficulty: "Hardcore" },
  { id: 159, question: "What is 'pre-PhD' course load like?", options: { A: "Light", B: "Heavy coursework before research", C: "None", D: "Easy" }, answer: "B", difficulty: "Hardcore" },
  { id: 160, question: "What is 'MS vs PhD' decision based on?", options: { A: "Random", B: "Career goals and patience level", C: "Sports", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 161, question: "What is 'foreign university application' stress?", options: { A: "None", B: "GRE/TOEFL/SOP/LOR chaos", C: "Easy", D: "Fun" }, answer: "B", difficulty: "Hardcore" },
  { id: 162, question: "What is 'LOR' hunting like?", options: { A: "Easy", B: "Professor availability nightmare", C: "Fun", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 163, question: "What is 'SOP' writing struggle?", options: { A: "Easy", B: "Selling yourself in 1000 words", C: "Fun", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 164, question: "What is 'scholarship' application grind?", options: { A: "Easy", B: "Endless forms and essays", C: "Fun", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 165, question: "What is 'visa interview' anxiety?", options: { A: "None", B: "Will I get rejected?", C: "Fun", D: "Easy" }, answer: "B", difficulty: "Hardcore" },
  { id: 166, question: "What is 'admit season' WhatsApp group like?", options: { A: "Dead", B: "Constant comparison and updates", C: "Quiet", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 167, question: "What is 'reject mail' coping mechanism?", options: { A: "Crying", B: "It's their loss mentality", C: "Partying", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 168, question: "What is 'waitlist' torture?", options: { A: "Fun", B: "Endless hoping and refreshing", C: "Easy", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 169, question: "What is 'decision day' drama?", options: { A: "Calm", B: "Last minute program switching", C: "Easy", D: "None" }, answer: "B", difficulty: "Hardcore" },
  { id: 170, question: "What is 'gap year' stigma in India?", options: { A: "None", B: "Still exists unfortunately", C: "Celebrated", D: "None" }, answer: "B", difficulty: "Hardcore" },

  // NUCLEAR (50 questions)
  { id: 171, question: "Who is 'Pondi Baba' really?", options: { A: "A god", B: "No one knows for sure—that's the legend", C: "A professor", D: "A ghost" }, answer: "B", difficulty: "Nuclear" },
  { id: 172, question: "What is the 'Orchid 12 AM' experience?", options: { A: "Closed", B: "Late night ice cream with existential crisis friends", C: "Breakfast", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 173, question: "What is 'HG ki chai' secret ingredient?", options: { A: "Love", B: "Nostalgia and questionable hygiene", C: "Sugar", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 174, question: "What is the real 'Varanasi Junction vs Mughal Sarai' trick question?", options: { A: "Same", B: "Different stations, tourists always confused", C: "None exist", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 175, question: "What is 'Lanka auto' negotiation like?", options: { A: "Easy", B: "Legendary haggling skills required", C: "Fixed price", D: "Free" }, answer: "B", difficulty: "Nuclear" },
  { id: 176, question: "What is the 'mess sabzi' identification game?", options: { A: "Easy", B: "Impossible—everything looks same", C: "Fun", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 177, question: "What is 'exam night Ganga darshan' about?", options: { A: "Religion", B: "Avoiding study by existential walks", C: "Swimming", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 178, question: "What is 'Satkaar ki dahi'?", options: { A: "Nothing special", B: "Legendary thick curd", C: "Yogurt drink", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 179, question: "What is the 'hostel day budget exceed' tradition?", options: { A: "Savings", B: "Always spending more than planned", C: "None", D: "Profit" }, answer: "B", difficulty: "Nuclear" },
  { id: 180, question: "What is 'branch change regret' about?", options: { A: "None", B: "Grass wasn't greener", C: "Always good", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 181, question: "What is 'Technex night' memory?", options: { A: "Sleep", B: "No sleep, maximum chaos", C: "Study", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 182, question: "What is 'Kashiyatra performance' anxiety?", options: { A: "None", B: "Stage fright multiplied by 1000", C: "Fun", D: "Easy" }, answer: "B", difficulty: "Nuclear" },
  { id: 183, question: "What is the 'first year to final year' transformation?", options: { A: "None", B: "Innocent to cynical expert", C: "Same", D: "Worse" }, answer: "B", difficulty: "Nuclear" },
  { id: 184, question: "What is 'campus romance' success rate?", options: { A: "High", B: "Varies wildly—mostly drama", C: "100%", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 185, question: "What is 'farewell speech' emotion about?", options: { A: "Fake", B: "Genuine nostalgia hitting hard", C: "None", D: "Boring" }, answer: "B", difficulty: "Nuclear" },
  { id: 186, question: "What is 'convocation delay' frustration?", options: { A: "None", B: "Waiting years for a ceremony", C: "Fun", D: "Quick" }, answer: "B", difficulty: "Nuclear" },
  { id: 187, question: "What is 'alumni network' reality?", options: { A: "Useless", B: "Surprisingly helpful sometimes", C: "None", D: "Perfect" }, answer: "B", difficulty: "Nuclear" },
  { id: 188, question: "What is 'LinkedIn IIT tag' effect?", options: { A: "None", B: "Instant credibility boost", C: "Negative", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 189, question: "What is 'IIT brand' career crutch?", options: { A: "None", B: "Opens doors but doesn't guarantee success", C: "Everything", D: "Nothing" }, answer: "B", difficulty: "Nuclear" },
  { id: 190, question: "What is 'campus nostalgia' post-graduation?", options: { A: "None", B: "Hits harder with each passing year", C: "Immediate", D: "Never" }, answer: "B", difficulty: "Nuclear" },
  { id: 191, question: "What is 'Banaras food' withdrawal post-college?", options: { A: "None", B: "Craving that cannot be satisfied elsewhere", C: "Easy", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 192, question: "What is the 'Ganga sunset' memory like?", options: { A: "Forgettable", B: "Stays with you forever", C: "None", D: "Bad" }, answer: "B", difficulty: "Nuclear" },
  { id: 193, question: "What is 'hostel reunion' plan vs reality?", options: { A: "Same", B: "Plan fails, chaos ensues", C: "None", D: "Perfect" }, answer: "B", difficulty: "Nuclear" },
  { id: 194, question: "What is 'batch WhatsApp group' activity post-college?", options: { A: "Active", B: "Mostly birthday wishes and job postings", C: "Dead", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 195, question: "What is the 'campus visit post-graduation' feeling?", options: { A: "None", B: "Bittersweet time travel", C: "Bad", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 196, question: "What is 'Lanka market' haggling championship about?", options: { A: "Sports", B: "Getting best prices on everything", C: "None", D: "Easy" }, answer: "B", difficulty: "Nuclear" },
  { id: 197, question: "What is 'Assi Ghat morning' ritual?", options: { A: "Nothing", B: "Tea + newspaper + people watching", C: "Swimming", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 198, question: "What is the 'Manikarnika Ghat' first visit experience?", options: { A: "Fun", B: "Deeply philosophical and unsettling", C: "None", D: "Easy" }, answer: "B", difficulty: "Nuclear" },
  { id: 199, question: "What is 'Banaras time' concept?", options: { A: "Same as normal", B: "Everything runs on its own schedule", C: "Punctual", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 200, question: "What is the 'IIT BHU x Banaras' experience summary?", options: { A: "Normal", B: "Chaotic, transformative, unforgettable", C: "Boring", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 201, question: "What is 'chai pe charcha' culture?", options: { A: "Politics", B: "Deep conversations over cheap tea", C: "None", D: "Sports" }, answer: "B", difficulty: "Nuclear" },
  { id: 202, question: "What is 'final year project' last week?", options: { A: "Relaxed", B: "Pure panic and stack overflow", C: "None", D: "Easy" }, answer: "B", difficulty: "Nuclear" },
  { id: 203, question: "What is 'mess food appreciation' moment?", options: { A: "First day", B: "Only when you leave and eat outside", C: "Never", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 204, question: "What is 'hostel common room' at 3 AM?", options: { A: "Empty", B: "Exam warriors or FIFA addicts", C: "None", D: "Clean" }, answer: "B", difficulty: "Nuclear" },
  { id: 205, question: "What is 'proxy master' title earned by?", options: { A: "Attendance", B: "Signing for absent friends without getting caught", C: "Sports", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 206, question: "What is 'electric kettle contraband' about?", options: { A: "Legal", B: "Banned but everyone has one", C: "None", D: "None" }, answer: "B", difficulty: "Nuclear" },
  { id: 207, question: "What is 'room inspection' prep time?", options: { A: "Days", B: "5 minutes before warden arrives", C: "None", D: "Weeks" }, answer: "B", difficulty: "Nuclear" },
  { id: 208, question: "What is 'wing ka bond' about?", options: { A: "Finance", B: "Hostel floor friendships", C: "None", D: "Sports" }, answer: "B", difficulty: "Nuclear" },
  { id: 209, question: "What is 'senior wisdom' mostly?", options: { A: "Useful", B: "Outdated but delivered with confidence", C: "None", D: "Perfect" }, answer: "B", difficulty: "Nuclear" },
  { id: 210, question: "What is 'LC at 1 AM' for?", options: { A: "Shopping", B: "Late night chai and gossip", C: "Sleep", D: "None" }, answer: "B", difficulty: "Nuclear" }
];

const getRankTitle = (score: number, total: number): { title: string; color: string } => {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return { title: "Certified Lafadjhandi", color: "text-yellow-400" };
  if (percentage >= 70) return { title: "Campus Veteran", color: "text-primary" };
  if (percentage >= 50) return { title: "Hostelite", color: "text-secondary" };
  if (percentage >= 30) return { title: "Fresher", color: "text-accent" };
  return { title: "Tourist", color: "text-muted-foreground" };
};

const getDifficultyIcon = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "Easy": return <Sparkles className="w-4 h-4" />;
    case "Core": return <Flame className="w-4 h-4" />;
    case "Hardcore": return <Zap className="w-4 h-4" />;
    case "Nuclear": return <Skull className="w-4 h-4" />;
  }
};

const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "Easy": return "text-green-400 bg-green-400/10 border-green-400/20";
    case "Core": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    case "Hardcore": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    case "Nuclear": return "text-red-400 bg-red-400/10 border-red-400/20";
  }
};

export default function IITBHUQuiz() {
  const { toast } = useToast();
  const [state, setState] = useState<QuizState>("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Submission form state
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submissionData, setSubmissionData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A" as "A" | "B" | "C" | "D",
    difficulty: "Core" as Difficulty,
    submittedBy: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startQuiz = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 20));
    setCurrentIndex(0);
    setScore(0);
    setAnswers({});
    setSelectedAnswer(null);
    setShowResult(false);
    setState("playing");
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentIndex].answer;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setState("result");
    }
  };

  const handleSubmitQuestion = async () => {
    if (!submissionData.question || !submissionData.optionA || !submissionData.optionB || 
        !submissionData.optionC || !submissionData.optionD) {
      toast({ title: "Fill all fields!", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });
      
      if (res.ok) {
        toast({ title: "Question submitted for review!" });
        setSubmissionData({
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "A",
          difficulty: "Core",
          submittedBy: ""
        });
        setShowSubmitForm(false);
      } else {
        const data = await res.json();
        toast({ title: data.message || "Submission failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error submitting question", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const currentQuestion = questions[currentIndex];
  const rank = getRankTitle(score, questions.length);

  return (
    <div className="container mx-auto px-4 pb-20">
      <PageHeader 
        title="BHU × Banaras Insider Quiz" 
        subtitle="Only insiders score full marks." 
      />

      <AnimatePresence mode="wait">
        {state === "start" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto text-center"
          >
            <RetroCard glowColor="primary" className="p-8">
              <Brain className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h2 className="text-xl font-display mb-3">Proof that you were there.</h2>
              <p className="text-muted-foreground font-mono text-sm mb-6">
                20 random questions. 200+ insider trivia. No shortcuts.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {(["Easy", "Core", "Hardcore", "Nuclear"] as Difficulty[]).map(d => (
                  <span key={d} className={cn("px-3 py-1 rounded-full text-xs font-mono border flex items-center gap-2", getDifficultyColor(d))}>
                    {getDifficultyIcon(d)} {d}
                  </span>
                ))}
              </div>

              <Button onClick={startQuiz} size="lg" className="bg-primary font-mono" data-testid="button-start-quiz">
                <Zap className="w-4 h-4 mr-2" /> START QUIZ
              </Button>
            </RetroCard>

            <Button 
              variant="ghost" 
              onClick={() => setShowSubmitForm(true)}
              className="mt-8 text-muted-foreground font-mono text-xs"
              data-testid="button-submit-question"
            >
              Submit Your Own Question
            </Button>
          </motion.div>
        )}

        {state === "playing" && currentQuestion && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <span className={cn("px-3 py-1 rounded-full text-xs font-mono border flex items-center gap-2", getDifficultyColor(currentQuestion.difficulty))}>
                {getDifficultyIcon(currentQuestion.difficulty)} {currentQuestion.difficulty}
              </span>
              <span className="font-mono text-sm text-muted-foreground" data-testid="text-question-progress">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <RetroCard glowColor="secondary" className="p-6 mb-6">
              <h3 className="text-xl font-display mb-6 leading-relaxed">
                {currentQuestion.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {(["A", "B", "C", "D"] as const).map(opt => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = currentQuestion.answer === opt;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      disabled={showResult}
                      data-testid={`button-answer-${opt}`}
                      className={cn(
                        "p-4 rounded-lg text-left font-mono text-sm transition-all border",
                        "hover:bg-white/5",
                        showCorrect && "bg-green-500/20 border-green-500 text-green-400",
                        showWrong && "bg-red-500/20 border-red-500 text-red-400",
                        !showResult && isSelected && "bg-primary/20 border-primary",
                        !showResult && !isSelected && "bg-background/50 border-white/10"
                      )}
                    >
                      <span className="font-bold mr-3">{opt}.</span>
                      {currentQuestion.options[opt]}
                      {showCorrect && <CheckCircle className="inline w-4 h-4 ml-2" />}
                      {showWrong && <XCircle className="inline w-4 h-4 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </RetroCard>

            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <Button onClick={nextQuestion} className="bg-secondary font-mono" data-testid="button-next-question">
                  {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </motion.div>
        )}

        {state === "result" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <RetroCard glowColor="accent" className="p-8">
              <Trophy className={cn("w-20 h-20 mx-auto mb-6", rank.color)} />
              <h2 className="text-3xl font-display mb-2">Quiz Complete!</h2>
              <p className="text-4xl font-bold mb-4" data-testid="text-score">{score} / {questions.length}</p>
              <p className={cn("text-2xl font-display uppercase tracking-wider mb-8", rank.color)} data-testid="text-rank">
                {rank.title}
              </p>

              <div className="flex justify-center gap-4">
                <Button onClick={startQuiz} className="bg-primary font-mono" data-testid="button-play-again">
                  <RefreshCw className="w-4 h-4 mr-2" /> Play Again
                </Button>
                <Button variant="outline" onClick={() => setState("start")} className="font-mono" data-testid="button-back-start">
                  Back to Start
                </Button>
              </div>
            </RetroCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Question Modal */}
      <AnimatePresence>
        {showSubmitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSubmitForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <RetroCard glowColor="primary" className="p-6">
                <h3 className="text-xl font-display mb-6">Submit Your Own Insider Question</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-muted-foreground uppercase">Question</label>
                    <Textarea 
                      value={submissionData.question}
                      onChange={e => setSubmissionData(d => ({ ...d, question: e.target.value }))}
                      placeholder="What is the unofficial mascot of hostel nights?"
                      className="mt-1 bg-background/50"
                      data-testid="input-question"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-muted-foreground">Option A</label>
                      <Input 
                        value={submissionData.optionA}
                        onChange={e => setSubmissionData(d => ({ ...d, optionA: e.target.value }))}
                        className="mt-1 bg-background/50"
                        data-testid="input-option-a"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-muted-foreground">Option B</label>
                      <Input 
                        value={submissionData.optionB}
                        onChange={e => setSubmissionData(d => ({ ...d, optionB: e.target.value }))}
                        className="mt-1 bg-background/50"
                        data-testid="input-option-b"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-muted-foreground">Option C</label>
                      <Input 
                        value={submissionData.optionC}
                        onChange={e => setSubmissionData(d => ({ ...d, optionC: e.target.value }))}
                        className="mt-1 bg-background/50"
                        data-testid="input-option-c"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-muted-foreground">Option D</label>
                      <Input 
                        value={submissionData.optionD}
                        onChange={e => setSubmissionData(d => ({ ...d, optionD: e.target.value }))}
                        className="mt-1 bg-background/50"
                        data-testid="input-option-d"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-muted-foreground">Correct Answer</label>
                      <div className="flex gap-2 mt-1">
                        {(["A", "B", "C", "D"] as const).map(opt => (
                          <Button
                            key={opt}
                            size="sm"
                            variant={submissionData.correctAnswer === opt ? "default" : "outline"}
                            onClick={() => setSubmissionData(d => ({ ...d, correctAnswer: opt }))}
                            className="flex-1"
                            data-testid={`button-correct-${opt}`}
                          >
                            {opt}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-muted-foreground">Difficulty</label>
                      <div className="flex gap-1 mt-1">
                        {(["Easy", "Core", "Hardcore", "Nuclear"] as Difficulty[]).map(d => (
                          <Button
                            key={d}
                            size="sm"
                            variant={submissionData.difficulty === d ? "default" : "outline"}
                            onClick={() => setSubmissionData(s => ({ ...s, difficulty: d }))}
                            className="flex-1 text-[10px] px-1"
                            data-testid={`button-difficulty-${d.toLowerCase()}`}
                          >
                            {d.slice(0, 4)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-muted-foreground">Your Name (optional)</label>
                    <Input 
                      value={submissionData.submittedBy}
                      onChange={e => setSubmissionData(d => ({ ...d, submittedBy: e.target.value }))}
                      placeholder="Anonymous Lafadjhandi"
                      className="mt-1 bg-background/50"
                      data-testid="input-submitted-by"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handleSubmitQuestion} 
                      disabled={isSubmitting}
                      className="flex-1 bg-primary hover:bg-primary/90"
                      data-testid="button-submit-form"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Submitting..." : "Submit Question"}
                    </Button>
                    <Button variant="outline" onClick={() => setShowSubmitForm(false)} data-testid="button-cancel-submit">
                      Cancel
                    </Button>
                  </div>
                </div>
              </RetroCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
