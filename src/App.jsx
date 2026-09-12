import { useState } from "react";
import "./App.css";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const COLOURS = [
  "#3D6B63",
  "#B9891F",
  "#B5503A",
  "#6E7F80",
  "#8A6F8F",
  "#7B6C9A",
];

const FREQUENCIES = [
  "Daily",
  "Weekdays",
  "Weekends",
  "3x a week",
  "2x a week",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "As needed",
];

const TASK_LIBRARY = [
  {
    id: "kitchen",
    title: "Kitchen and meals",
    description:
      "Food planning, cooking, dishes and keeping the kitchen running.",
    tasks: [
      "Plan meals",
      "Create grocery list",
      "Do grocery shopping",
      "Unpack groceries",
      "Prepare breakfast",
      "Prepare lunches",
      "Prepare dinner",
      "Pack lunches",
      "Load dishwasher",
      "Unload dishwasher",
      "Handwash dishes",
      "Wipe kitchen benches",
      "Clean stovetop",
      "Clean microwave",
      "Clean oven",
      "Clean refrigerator",
      "Check leftovers",
      "Organise pantry",
    ],
  },
  {
    id: "living",
    title: "Living and lounge rooms",
    description:
      "Jobs that keep shared living spaces comfortable and usable.",
    tasks: [
      "Vacuum living room",
      "Mop living room floors",
      "Dust furniture",
      "Dust shelves",
      "Clean television",
      "Clean coffee table",
      "Tidy cushions",
      "Fold blankets",
      "Put away items left in living room",
      "Clean windows",
      "Dust ceiling fans",
      "Vacuum sofa",
      "Declutter surfaces",
    ],
  },
  {
    id: "bedrooms",
    title: "Bedrooms",
    description:
      "Bed linen, tidying, cleaning and bedroom upkeep.",
    tasks: [
      "Make beds",
      "Change bed linen",
      "Wash bed linen",
      "Vacuum bedrooms",
      "Dust bedrooms",
      "Clean bedroom mirrors",
      "Put clothes away",
      "Tidy bedside tables",
      "Declutter bedroom surfaces",
      "Organise wardrobes",
    ],
  },
  {
    id: "bathrooms",
    title: "Bathrooms",
    description:
      "Cleaning, supplies and maintenance for bathrooms and toilets.",
    tasks: [
      "Clean toilets",
      "Clean shower",
      "Clean bath",
      "Clean bathroom sink",
      "Wipe vanity",
      "Clean mirrors",
      "Mop bathroom floor",
      "Wash bath mats",
      "Wash towels",
      "Restock toilet paper",
      "Restock bathroom supplies",
      "Clean shower screen",
    ],
  },
  {
    id: "laundry",
    title: "Laundry and clothing",
    description:
      "Washing, drying, folding and keeping clothing organised.",
    tasks: [
      "Collect dirty clothes",
      "Sort laundry",
      "Wash clothes",
      "Hang washing",
      "Bring washing in",
      "Dry clothes",
      "Fold clothes",
      "Put clothes away",
      "Iron clothes",
      "Wash school uniforms",
      "Prepare school uniforms",
      "Clean washing machine",
    ],
  },
  {
    id: "shopping",
    title: "Shopping and household supplies",
    description:
      "Keeping household essentials stocked and errands moving.",
    tasks: [
      "Monitor toilet paper",
      "Buy toiletries",
      "Buy cleaning supplies",
      "Buy groceries",
      "Buy pet supplies",
      "Buy school supplies",
      "Collect parcels",
      "Return purchases",
      "Pick up prescriptions",
      "Monitor household supplies",
      "Buy gifts",
    ],
  },
  {
    id: "garden",
    title: "Garden and outdoor areas",
    description:
      "Jobs that keep outdoor spaces maintained and usable.",
    tasks: [
      "Mow lawn",
      "Trim lawn edges",
      "Weed garden",
      "Water plants",
      "Prune plants",
      "Sweep outdoor areas",
      "Clean outdoor furniture",
      "Clean barbecue",
      "Clear leaves",
      "Maintain garden tools",
    ],
  },
  {
    id: "vehicles",
    title: "Vehicles",
    description:
      "Cleaning, servicing and remembering vehicle-related jobs.",
    tasks: [
      "Refuel or charge vehicle",
      "Wash car",
      "Vacuum car",
      "Check tyres",
      "Book vehicle servicing",
      "Manage registration",
      "Manage vehicle insurance",
      "Organise vehicle repairs",
      "Clean inside vehicle",
    ],
  },
  {
    id: "admin",
    title: "Household admin and maintenance",
    description:
      "The remembering, organising and follow-up work that keeps a household functioning.",
    tasks: [
      "Pay electricity bill",
      "Pay gas bill",
      "Pay water bill",
      "Pay internet bill",
      "Pay rent or mortgage",
      "Manage subscriptions",
      "Book tradespeople",
      "Follow up tradespeople",
      "Check smoke alarms",
      "Replace light bulbs",
      "Organise household paperwork",
      "Review insurance",
      "Renew registrations",
      "Manage household budget",
    ],
  },
  {
    id: "family",
    title: "Family logistics",
    description:
      "Appointments, events, transport and family organisation.",
    tasks: [
      "Manage family calendar",
      "Remember birthdays",
      "Buy birthday gifts",
      "Organise birthday celebrations",
      "Organise family visits",
      "Book medical appointments",
      "Book dental appointments",
      "Plan holidays",
      "Organise family transport",
      "Manage invitations",
      "Arrange childcare",
    ],
  },
  {
    id: "kids",
    title: "Kids and family",
    description:
      "Daily care, school organisation and children's activities.",
    tasks: [
      "Pack school bags",
      "Prepare school lunches",
      "Manage school emails",
      "Complete school forms",
      "Organise uniforms",
      "Homework support",
      "Reading with children",
      "School drop-off",
      "School pick-up",
      "Organise extracurricular activities",
      "Transport to sport or activities",
      "Manage bedtime routine",
      "Manage morning routine",
      "Book children's appointments",
      "Track exam or assessment dates",
    ],
  },
  {
    id: "pets",
    title: "Pets",
    description:
      "Feeding, care, cleaning and pet health responsibilities.",
    tasks: [
      "Feed pets",
      "Refresh pet water",
      "Walk pets",
      "Exercise pets",
      "Clean litter or enclosure",
      "Groom pets",
      "Bath pets",
      "Give pet medication",
      "Order pet food",
      "Book vet appointments",
      "Manage vaccinations",
      "Arrange pet care when away",
      "Clean pet bedding",
    ],
  },
  {
    id: "garage",
    title: "Garage and storage",
    description:
      "Organising storage areas and keeping them practical and safe.",
    tasks: [
      "Sweep garage",
      "Organise tools",
      "Put stored items away",
      "Declutter garage",
      "Organise shelves",
      "Dispose of unwanted items",
      "Maintain tools",
      "Organise recycling",
    ],
  },
  {
    id: "office",
    title: "Home office or study",
    description:
      "Keeping work and study spaces organised and functional.",
    tasks: [
      "Tidy desk",
      "File paperwork",
      "Empty office bin",
      "Dust equipment",
      "Clean computer screen",
      "Organise cables",
      "Restock printer supplies",
      "Organise documents",
      "Back up files",
    ],
  },
];

function emptyDays() {
  return {
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  };
}

function App() {
  const [step, setStep] = useState(1);
  const [setupPath, setSetupPath] = useState(null);
  const [setupComplete, setSetupComplete] = useState(false);
  const [appPage, setAppPage] = useState("today");

  const [people, setPeople] = useState([
    {
      id: 1,
      name: "You",
      colour: COLOURS[0],
    },
    {
      id: 2,
      name: "Partner",
      colour: COLOURS[1],
    },
  ]);

  const [profile, setProfile] = useState({
    bedrooms: 3,
    bathrooms: 1,
    livingRooms: 1,
    features: {
      kitchen: true,
      laundry: true,
      garage: false,
      garden: false,
      office: false,
    },
    children: "no",
    pets: "no",
    vehicles: "no",
  });

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [customInputs, setCustomInputs] = useState({});
  const [taskDetails, setTaskDetails] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [minimumMode, setMinimumMode] = useState(false);

  const [captureText, setCaptureText] = useState("");
  const [captureItems, setCaptureItems] = useState([]);

  const [helpStartChoice, setHelpStartChoice] = useState(null);
  const [helpStartMode, setHelpStartMode] = useState("");

  const [decidingItemId, setDecidingItemId] = useState(null);

  const [decisionDraft, setDecisionDraft] = useState({
    ownerId: "",
    doerId: "",
    frequency: "As needed",
    duration: 15,
  });

  const [roomScanImage, setRoomScanImage] = useState(null);
  const [roomScanSuggestions, setRoomScanSuggestions] = useState([]);
  const [roomScanAnalysed, setRoomScanAnalysed] = useState(false);
  const [roomScanLoading, setRoomScanLoading] = useState(false);
  const [roomScanError, setRoomScanError] = useState("");

  const addPerson = () => {
    setPeople((current) => [
      ...current,
      {
        id: Date.now(),
        name: `Person ${current.length + 1}`,
        colour: COLOURS[current.length % COLOURS.length],
      },
    ]);
  };

  const renamePerson = (id, name) => {
    setPeople((current) =>
      current.map((person) =>
        person.id === id ? { ...person, name } : person
      )
    );
  };

  const removePerson = (id) => {
    if (people.length <= 1) return;

    setPeople((current) =>
      current.filter((person) => person.id !== id)
    );
  };

  const toggleTask = (taskName) => {
    setSelectedTasks((current) =>
      current.includes(taskName)
        ? current.filter((task) => task !== taskName)
        : [...current, taskName]
    );
  };

  const sectionSelected = (section) =>
    section.tasks.every((task) => selectedTasks.includes(task));

  const toggleWholeSection = (section) => {
    if (sectionSelected(section)) {
      setSelectedTasks((current) =>
        current.filter((task) => !section.tasks.includes(task))
      );
    } else {
      setSelectedTasks((current) => [
        ...new Set([...current, ...section.tasks]),
      ]);
    }
  };

  const clearAllSelections = () => {
    setSelectedTasks([]);
  };

  const addOtherTask = (sectionId) => {
    const value = (customInputs[sectionId] || "").trim();

    if (!value) return;

    setSelectedTasks((current) => [
      ...new Set([...current, value]),
    ]);

    setCustomInputs((current) => ({
      ...current,
      [sectionId]: "",
    }));
  };

  const initialiseTaskDetails = () => {
    setTaskDetails((current) => {
      const updated = { ...current };

      selectedTasks.forEach((task) => {
        if (!updated[task]) {
          updated[task] = {
            ownerId: people[0]?.id ?? "",
            mode: "one",
            doerId: people[0]?.id ?? "",
            frequency: "Weekly",
            duration: 15,
            days: emptyDays(),
          };
        }
      });

      return updated;
    });
  };

  const updateTask = (task, field, value) => {
    setTaskDetails((current) => ({
      ...current,
      [task]: {
        ...current[task],
        [field]: value,
      },
    }));
  };

  const updateTaskDay = (task, day, value) => {
    setTaskDetails((current) => ({
      ...current,
      [task]: {
        ...current[task],
        days: {
          ...current[task].days,
          [day]: value,
        },
      },
    }));
  };

  const personName = (id) =>
    people.find(
      (person) => String(person.id) === String(id)
    )?.name || "Nobody";

  const personColour = (id) =>
    people.find(
      (person) => String(person.id) === String(id)
    )?.colour || "#6E7F80";

  const visibleSection = (section) => {
    if (section.id === "kids" && profile.children === "no") {
      return false;
    }

    if (section.id === "pets" && profile.pets === "no") {
      return false;
    }

    if (section.id === "garden" && !profile.features.garden) {
      return false;
    }

    if (section.id === "garage" && !profile.features.garage) {
      return false;
    }

    if (section.id === "office" && !profile.features.office) {
      return false;
    }

    if (section.id === "vehicles" && profile.vehicles === "no") {
      return false;
    }

    return true;
  };

  const getAutomaticDays = (frequency) => {
    switch (frequency) {
      case "Daily":
        return DAYS;

      case "Weekdays":
        return DAYS.slice(0, 5);

      case "Weekends":
        return ["Saturday", "Sunday"];

      case "3x a week":
        return ["Monday", "Wednesday", "Friday"];

      case "2x a week":
        return ["Tuesday", "Saturday"];

      case "Weekly":
        return ["Saturday"];

      default:
        return [];
    }
  };

  const getScheduleForDay = (day) => {
    const items = [];

    selectedTasks.forEach((task) => {
      const details = taskDetails[task];

      if (!details) return;

      if (details.mode === "days") {
        const assigned = details.days?.[day];

        if (!assigned) return;

        items.push({
          task,
          duration: Number(details.duration) || 0,
          personId: assigned,
          together: assigned === "together",
        });

        return;
      }

      if (
        details.frequency === "As needed" ||
        details.frequency === "Fortnightly" ||
        details.frequency === "Monthly"
      ) {
        return;
      }

      const automaticDays =
        getAutomaticDays(details.frequency);

      if (automaticDays.includes(day)) {
        items.push({
          task,
          duration: Number(details.duration) || 0,
          personId: details.doerId,
          together: false,
        });
      }
    });

    return items;
  };

  const getAsNeededTasks = () =>
    selectedTasks.filter((task) => {
      const details = taskDetails[task];

      return (
        details?.mode === "one" &&
        ["As needed", "Fortnightly", "Monthly"].includes(
          details.frequency
        )
      );
    });

  const formatMinutes = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    if (remaining === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${remaining} min`;
  };

  const buildFairnessData = () => {
    const data = {};

    people.forEach((person) => {
      data[person.id] = {
        time: 0,
        ownership: 0,
        occurrences: 0,
        sharedOccurrences: 0,
      };
    });

    selectedTasks.forEach((task) => {
      const details = taskDetails[task];

      if (!details) return;

      if (data[details.ownerId]) {
        data[details.ownerId].ownership += 1;
      }
    });

    DAYS.forEach((day) => {
      getScheduleForDay(day).forEach((item) => {
        if (item.together) {
          people.forEach((person) => {
            data[person.id].time += item.duration;
            data[person.id].occurrences += 1;
            data[person.id].sharedOccurrences += 1;
          });
        } else if (data[item.personId]) {
          data[item.personId].time += item.duration;
          data[item.personId].occurrences += 1;
        }
      });
    });

    return data;
  };

  const fairnessData = buildFairnessData();

  const getHighestPerson = (field) => {
    if (!people.length) return null;

    return [...people].sort(
      (a, b) =>
        (fairnessData[b.id]?.[field] || 0) -
        (fairnessData[a.id]?.[field] || 0)
    )[0];
  };

  const getLowestPerson = (field) => {
    if (!people.length) return null;

    return [...people].sort(
      (a, b) =>
        (fairnessData[a.id]?.[field] || 0) -
        (fairnessData[b.id]?.[field] || 0)
    )[0];
  };

  const getFairnessObservation = () => {
    if (people.length < 2) {
      return "This view shows how your responsibilities are distributed across time, ownership and doing.";
    }

    const highestTimePerson = getHighestPerson("time");
    const lowestTimePerson = getLowestPerson("time");
    const highestOwnerPerson = getHighestPerson("ownership");

    const highestTime =
      fairnessData[highestTimePerson.id]?.time || 0;

    const lowestTime =
      fairnessData[lowestTimePerson.id]?.time || 0;

    const difference = highestTime - lowestTime;

    const ownershipValues = people.map(
      (person) =>
        fairnessData[person.id]?.ownership || 0
    );

    const ownershipDifference =
      Math.max(...ownershipValues) -
      Math.min(...ownershipValues);

    if (difference < 30 && ownershipDifference <= 1) {
      return "Scheduled time and ownership are currently fairly close. That does not automatically mean the arrangement feels fair — capacity and preferences matter too.";
    }

    if (difference >= 30) {
      return `${highestTimePerson.name} currently has more scheduled task time than ${lowestTimePerson.name}. This does not automatically mean the arrangement is unfair.`;
    }

    if (ownershipDifference >= 2) {
      return `${highestOwnerPerson.name} currently owns more responsibilities. Remembering, planning and following up are part of the household load too.`;
    }

    return "The household load is distributed differently across time, ownership and doing.";
  };

  const addCaptureItem = () => {
    const cleaned = captureText.trim();

    if (!cleaned) return;

    setCaptureItems((current) => [
      {
        id: Date.now(),
        text: cleaned,
      },
      ...current,
    ]);

    setCaptureText("");
  };

  const removeCaptureItem = (id) => {
    setCaptureItems((current) =>
      current.filter((item) => item.id !== id)
    );

    if (decidingItemId === id) {
      setDecidingItemId(null);
    }
  };

  const startDecision = (item) => {
    setDecidingItemId(item.id);

    setDecisionDraft({
      ownerId: String(people[0]?.id ?? ""),
      doerId: String(people[0]?.id ?? ""),
      frequency: "As needed",
      duration: 15,
    });
  };

  const cancelDecision = () => {
    setDecidingItemId(null);
  };

  const saveDecision = (item) => {
    setSelectedTasks((current) => [
      ...new Set([...current, item.text]),
    ]);

    setTaskDetails((current) => ({
      ...current,

      [item.text]: {
        ownerId: decisionDraft.ownerId,
        mode: "one",
        doerId: decisionDraft.doerId,
        frequency: decisionDraft.frequency,
        duration: Number(decisionDraft.duration) || 15,
        days: emptyDays(),
      },
    }));

    removeCaptureItem(item.id);
    setDecidingItemId(null);
  };

  const chooseHelpStartTask = (mode) => {
    let candidates = selectedTasks
      .map((task) => ({
        task,
        details: taskDetails[task],
      }))
      .filter((item) => item.details);

    if (mode === "5") {
      candidates = candidates.filter(
        (item) => Number(item.details.duration) <= 5
      );
    }

    if (mode === "15") {
      candidates = candidates.filter(
        (item) => Number(item.details.duration) <= 15
      );
    }

    if (mode === "low") {
      candidates = candidates.sort(
        (a, b) =>
          Number(a.details.duration) -
          Number(b.details.duration)
      );

      candidates = candidates.slice(
        0,
        Math.min(3, candidates.length)
      );
    }

    setHelpStartMode(mode);

    if (candidates.length === 0) {
      let message =
        "There are no organised responsibilities yet.";

      if (mode === "5") {
        message =
          "There are no responsibilities estimated at 5 minutes or less yet.";
      }

      if (mode === "15") {
        message =
          "There are no responsibilities estimated at 15 minutes or less yet.";
      }

      setHelpStartChoice({
        error: message,
      });

      return;
    }

    const choice =
      candidates[
        Math.floor(Math.random() * candidates.length)
      ];

    setHelpStartChoice(choice);
  };

  const giveAnotherHelpStartTask = () => {
    if (!helpStartChoice || helpStartChoice.error) {
      return;
    }

    let candidates = selectedTasks
      .map((task) => ({
        task,
        details: taskDetails[task],
      }))
      .filter((item) => item.details);

    if (helpStartMode === "5") {
      candidates = candidates.filter(
        (item) => Number(item.details.duration) <= 5
      );
    }

    if (helpStartMode === "15") {
      candidates = candidates.filter(
        (item) => Number(item.details.duration) <= 15
      );
    }

    if (helpStartMode === "low") {
      candidates = candidates.sort(
        (a, b) =>
          Number(a.details.duration) -
          Number(b.details.duration)
      );

      candidates = candidates.slice(
        0,
        Math.min(3, candidates.length)
      );
    }

    const alternatives = candidates.filter(
      (item) =>
        item.task !== helpStartChoice.task
    );

    const pool =
      alternatives.length > 0
        ? alternatives
        : candidates;

    if (pool.length === 0) return;

    const nextChoice =
      pool[Math.floor(Math.random() * pool.length)];

    setHelpStartChoice(nextChoice);
  };

const acceptHelpStartTask = () => {
  if (!helpStartChoice || helpStartChoice.error) {
    return;
  }

  const todayIndex = todaysTasks.findIndex(
    (item) => item.task === helpStartChoice.task
  );

  if (todayIndex !== -1) {
    const key = `${todayName}-${helpStartChoice.task}-${todayIndex}`;

    setCompletedTasks((current) => ({
      ...current,
      [key]: true,
    }));
  }

  setHelpStartChoice({
    ...helpStartChoice,
    accepted: true,
    completedToday: todayIndex !== -1,
  });
};

  const handleRoomImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setRoomScanImage(reader.result);
      setRoomScanSuggestions([]);
      setRoomScanAnalysed(false);
      setRoomScanError("");
    };

    reader.readAsDataURL(file);
  };

  const analyseRoomAI = async () => {
    if (!roomScanImage) return;

    setRoomScanLoading(true);
    setRoomScanError("");
    setRoomScanSuggestions([]);
    setRoomScanAnalysed(false);

    try {
      const response = await fetch(
        "/.netlify/functions/analyse-room",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: roomScanImage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Room Scan could not analyse the image."
        );
      }

      setRoomScanSuggestions(
        data.suggestions || []
      );

      setRoomScanAnalysed(true);
    } catch (error) {
      console.error(error);

      setRoomScanError(
        error.message ||
          "Something went wrong while analysing the room."
      );
    } finally {
      setRoomScanLoading(false);
    }
  };

  const addRoomSuggestionToCapture = (
    suggestion
  ) => {
    setCaptureItems((current) => {
      const alreadyExists =
        current.some(
          (item) =>
            item.text.toLowerCase() ===
            suggestion.task.toLowerCase()
        );

      if (alreadyExists) {
        return current;
      }

      return [
        {
          id: Date.now() + Math.random(),
          text: suggestion.task,
        },
        ...current,
      ];
    });

    setRoomScanSuggestions((current) =>
      current.filter(
        (item) => item.id !== suggestion.id
      )
    );
  };

  const addAllRoomSuggestionsToCapture = () => {
    setCaptureItems((current) => {
      const existingNames = current.map(
        (item) => item.text.toLowerCase()
      );

      const newItems = roomScanSuggestions
        .filter(
          (suggestion) =>
            !existingNames.includes(
              suggestion.task.toLowerCase()
            )
        )
        .map((suggestion, index) => ({
          id: Date.now() + index,
          text: suggestion.task,
        }));

      return [...newItems, ...current];
    });

    setRoomScanSuggestions([]);
  };

  const clearRoomScan = () => {
    setRoomScanImage(null);
    setRoomScanSuggestions([]);
    setRoomScanAnalysed(false);
    setRoomScanLoading(false);
    setRoomScanError("");
  };

  const getTodayName = () => {
    const names = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return names[new Date().getDay()];
  };

  const todayName = getTodayName();

const todaysTasks =
  getScheduleForDay(todayName);

const visibleTodaysTasks = minimumMode
  ? todaysTasks.filter(
      (item) => Number(item.duration) <= 10
    )
  : todaysTasks;

  const toggleComplete = (key) => {
    setCompletedTasks((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const finishSetup = () => {
    setSetupComplete(true);

    setAppPage(
      setupPath === "capture"
        ? "capture"
        : "today"
    );
  };

  const chooseFullSetup = () => {
    setSetupPath("full");
    setStep(3);
  };

  const chooseCaptureSetup = () => {
    setSetupPath("capture");
    setStep(3);
  };

  const setupBack = () => {
    if (step === 3) {
      setStep(2);
      return;
    }

    setStep((current) =>
      Math.max(current - 1, 1)
    );
  };

  const setupNext = () => {
    if (
      setupPath === "full" &&
      step === 4
    ) {
      initialiseTaskDetails();
    }

    setStep((current) =>
      Math.min(current + 1, 8)
    );
  };

  const renderCaptureInbox = () => (
    <section className="capture-inbox-section">
      <div className="capture-inbox-heading">
        <div>
          <p className="today-eyebrow">
            INBOX
          </p>

          <h3>
            Things you've captured
          </h3>

          <p>
            Leave them here until you are ready
            to decide what to do with them.
          </p>
        </div>

        <span className="capture-count">
          {captureItems.length}
        </span>
      </div>

      {captureItems.length === 0 ? (
        <div className="capture-empty">
          <strong>
            Your inbox is clear.
          </strong>

          <p>
            Add things as they pop into your head.
          </p>
        </div>
      ) : (
        <div className="capture-list">
          {captureItems.map((item) => (
            <article
              className="capture-item capture-item-with-decide"
              key={item.id}
            >
              <div className="capture-item-main">
                <span className="capture-dot" />

                <strong>
                  {item.text}
                </strong>
              </div>

              {decidingItemId !== item.id && (
                <div className="capture-item-actions">
                  <button
                    className="capture-responsibility-button"
                    onClick={() =>
                      startDecision(item)
                    }
                  >
                    Decide
                  </button>

                  <button
                    className="capture-remove-button"
                    onClick={() =>
                      removeCaptureItem(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              )}

              {decidingItemId === item.id && (
                <div className="decide-panel">
                  <div className="decide-heading">
                    <div>
                      <p className="today-eyebrow">
                        DECIDE
                      </p>

                      <h4>
                        Turn this into a responsibility
                      </h4>

                      <p>
                        Choose only what makes sense now.
                        You can change it later.
                      </p>
                    </div>
                  </div>

                  <div className="decide-grid">
                    <label className="field">
                      <span>
                        Who owns it?
                      </span>

                      <small>
                        The person who remembers and
                        makes sure it happens.
                      </small>

                      <select
                        value={
                          decisionDraft.ownerId
                        }
                        onChange={(event) =>
                          setDecisionDraft(
                            (current) => ({
                              ...current,
                              ownerId:
                                event.target.value,
                            })
                          )
                        }
                      >
                        {people.map(
                          (person) => (
                            <option
                              key={person.id}
                              value={person.id}
                            >
                              {person.name}
                            </option>
                          )
                        )}
                      </select>
                    </label>

                    <label className="field">
                      <span>
                        Who usually does it?
                      </span>

                      <small>
                        This can be different from the owner.
                      </small>

                      <select
                        value={
                          decisionDraft.doerId
                        }
                        onChange={(event) =>
                          setDecisionDraft(
                            (current) => ({
                              ...current,
                              doerId:
                                event.target.value,
                            })
                          )
                        }
                      >
                        {people.map(
                          (person) => (
                            <option
                              key={person.id}
                              value={person.id}
                            >
                              {person.name}
                            </option>
                          )
                        )}
                      </select>
                    </label>

                    <label className="field">
                      <span>
                        How often?
                      </span>

                      <select
                        value={
                          decisionDraft.frequency
                        }
                        onChange={(event) =>
                          setDecisionDraft(
                            (current) => ({
                              ...current,
                              frequency:
                                event.target.value,
                            })
                          )
                        }
                      >
                        {FREQUENCIES.map(
                          (frequency) => (
                            <option
                              key={frequency}
                            >
                              {frequency}
                            </option>
                          )
                        )}
                      </select>
                    </label>

                    <label className="field">
                      <span>
                        About how long?
                      </span>

                      <div className="duration-row">
                        <input
                          type="number"
                          min="1"
                          value={
                            decisionDraft.duration
                          }
                          onChange={(event) =>
                            setDecisionDraft(
                              (current) => ({
                                ...current,
                                duration:
                                  Math.max(
                                    1,
                                    Number(
                                      event.target.value
                                    )
                                  ),
                              })
                            )
                          }
                        />

                        <span>
                          minutes
                        </span>
                      </div>
                    </label>
                  </div>

                  <div className="decide-summary">
                    <strong>
                      Current plan:
                    </strong>

                    <p>
                      {personName(
                        decisionDraft.ownerId
                      )}{" "}
                      owns this responsibility.{" "}
                      {personName(
                        decisionDraft.doerId
                      )}{" "}
                      usually does it. It is set to{" "}
                      <strong>
                        {
                          decisionDraft.frequency
                        }
                      </strong>
                      .
                    </p>
                  </div>

                  <div className="decide-actions">
                    <button
                      className="secondary-button"
                      onClick={cancelDecision}
                    >
                      Not ready yet
                    </button>

                    <button
                      className="primary-button"
                      onClick={() =>
                        saveDecision(item)
                      }
                    >
                      Save responsibility
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );

  if (setupComplete) {
    return (
      <div className="app main-app">
        <header className="app-header">
          <div className="app-header-inner">
            <div>
              <div className="brand">
                OURTY
              </div>

              <h1>
                Our load. Our way. Our team. Ourty.
              </h1>
            </div>

            <div className="household-chip">
              {people.length}{" "}
              {people.length === 1
                ? "person"
                : "people"}
            </div>
          </div>
        </header>

        <nav className="main-nav">
          <div className="main-nav-inner">
            {[
              ["today", "Today"],
              ["week", "Week"],
              [
                "responsibilities",
                "Responsibilities",
              ],
              ["capture", "Capture"],
              ["helpstart", "Help Me Start"],
              ["roomscan", "Room Scan"],
              ["fairness", "Fairness"],
              ["household", "Household"],
            ].map(([page, label]) => (
              <button
                key={page}
                className={
                  appPage === page
                    ? "nav-button active"
                    : "nav-button"
                }
                onClick={() =>
                  setAppPage(page)
                }
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        <main className="app-content">
          {appPage === "today" && (
            <>
           <section className="today-hero">
  <div className="today-hero-top">
    <div>
      <p className="today-eyebrow">
        TODAY
      </p>

      <h2>
        {todayName}
      </h2>

      <p>
        {minimumMode
          ? "Minimum Mode is showing only the smallest parts of today."
          : "Here is what is on the household plan for today."}
      </p>
    </div>

    <button
      className={
        minimumMode
          ? "minimum-mode-button active"
          : "minimum-mode-button"
      }
      onClick={() =>
        setMinimumMode((current) => !current)
      }
    >
      {minimumMode
        ? "Leave Minimum Mode"
        : "Minimum Mode"}
    </button>
  </div>

  {minimumMode && (
    <div className="minimum-mode-message">
      <strong>
        Today can be smaller.
      </strong>

      <p>
        Ourty is showing only jobs estimated
        at 10 minutes or less.
      </p>
    </div>
  )}
</section>

              <section className="today-summary-grid">
                <div className="today-summary-card">
                  <span>
                    Jobs today
                  </span>

                  <strong>
                    {visibleTodaysTasks.length}
                  </strong>
                </div>

                <div className="today-summary-card">
                  <span>
                    Estimated time
                  </span>

                  <strong>
                    {formatMinutes(
                      visibleTodaysTasks.reduce(
                        (total, item) =>
                          total +
                          item.duration,
                        0
                      )
                    )}
                  </strong>
                </div>

                <div className="today-summary-card">
                  <span>
                    Completed
                  </span>

                  <strong>
                    {
                      visibleTodaysTasks.filter(
                        (item, index) =>
                          completedTasks[
                            `${todayName}-${item.task}-${index}`
                          ]
                      ).length
                    }
                    /
                    {visibleTodaysTasks.length}
                  </strong>
                </div>
              </section>

              {visibleTodaysTasks.length === 0 ? (
                <section className="today-empty">
                  <h3>
                    Nothing scheduled today
                  </h3>

                  <p>
                    Your Capture Inbox can still hold
                    anything you remember.
                  </p>
                </section>
              ) : (
                <section className="today-task-section">
                  <p className="today-eyebrow">
                    TODAY'S PLAN
                  </p>

                  <h3>
                    What needs doing?
                  </h3>

                  <div className="today-task-list">
                    {visibleTodaysTasks.map(
                      (item, index) => {
                        const key = `${todayName}-${item.task}-${index}`;

                        return (
                          <label
                            className={
                              completedTasks[key]
                                ? "today-task-card complete"
                                : "today-task-card"
                            }
                            key={key}
                          >
                            <input
                              type="checkbox"
                              checked={
                                !!completedTasks[key]
                              }
                              onChange={() =>
                                toggleComplete(key)
                              }
                            />

                            <div className="today-task-content">
                              <div className="today-task-name">
                                <strong>
                                  {item.task}
                                </strong>

                                <span>
                                  {item.duration} min
                                </span>
                              </div>

                              <span className="today-person-pill">
                                {item.together
                                  ? "Together"
                                  : personName(
                                      item.personId
                                    )}
                              </span>
                            </div>
                          </label>
                        );
                      }
                    )}
                  </div>
                </section>
              )}

            {!minimumMode &&
  getAsNeededTasks().length > 0 && (
                <section className="today-flexible-section">
                  <p className="today-eyebrow">
                    FLEXIBLE
                  </p>

                  <h3>
                    Things worth keeping visible
                  </h3>

                  <p className="today-flexible-intro">
                    These jobs do not have a fixed day,
                    so they are reminders rather than
                    deadlines.
                  </p>

                  <div className="today-flexible-list">
                    {getAsNeededTasks().map(
                      (task) => {
                        const details =
                          taskDetails[task];

                        return (
                          <div
                            className="today-flexible-card"
                            key={task}
                          >
                            <div>
                              <strong>
                                {task}
                              </strong>

                              <span>
                                {
                                  details.frequency
                                }
                              </span>
                            </div>

                            <div className="today-person-pill">
                              <span
                                className="schedule-person-dot"
                                style={{
                                  backgroundColor:
                                    personColour(
                                      details.doerId
                                    ),
                                }}
                              />

                              {personName(
                                details.doerId
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </section>
              )}

              <section className="today-gentle-note">
                <strong>
                  The plan is here to help, not judge.
                </strong>

                <p>
                  If today changes, the schedule can
                  change too.
                </p>
              </section>
            </>
          )}

          {appPage === "week" && (
            <>
              <section className="app-page-heading">
                <p className="today-eyebrow">
                  WEEK
                </p>

                <h2>
                  Your week
                </h2>

                <p>
                  All scheduled household responsibilities
                  in one place.
                </p>
              </section>

              <div className="week-schedule">
                {DAYS.map((day) => {
                  const tasks =
                    getScheduleForDay(day);

                  const total =
                    tasks.reduce(
                      (sum, item) =>
                        sum +
                        item.duration,
                      0
                    );

                  return (
                    <article
                      className="schedule-day"
                      key={day}
                    >
                      <div className="schedule-day-heading">
                        <div>
                          <h3>
                            {day}
                          </h3>

                          <span>
                            {tasks.length}{" "}
                            {tasks.length === 1
                              ? "job"
                              : "jobs"}
                          </span>
                        </div>

                        {total > 0 && (
                          <div className="schedule-day-total">
                            {formatMinutes(total)}
                          </div>
                        )}
                      </div>

                      {tasks.length === 0 ? (
                        <div className="empty-day">
                          Nothing scheduled.
                        </div>
                      ) : (
                        <div className="schedule-task-list">
                          {tasks.map(
                            (item, index) => (
                              <div
                                className="schedule-task"
                                key={`${day}-${item.task}-${index}`}
                              >
                                <div className="schedule-task-main">
                                  <strong>
                                    {item.task}
                                  </strong>

                                  <span>
                                    {item.duration} min
                                  </span>
                                </div>

                                <div className="schedule-person">
                                  {item.together
                                    ? "Together"
                                    : personName(
                                        item.personId
                                      )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </>
          )}

          {appPage === "responsibilities" && (
            <>
              <section className="app-page-heading">
                <p className="today-eyebrow">
                  RESPONSIBILITIES
                </p>

                <h2>
                  What keeps the household running
                </h2>

                <p>
                  See who owns each responsibility and
                  how it is handled.
                </p>
              </section>

              {selectedTasks.length === 0 ? (
                <section className="today-empty">
                  <h3>
                    No organised responsibilities yet
                  </h3>

                  <p>
                    Start with Capture and organise things
                    when you are ready.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() =>
                      setAppPage("capture")
                    }
                  >
                    Go to Capture
                  </button>
                </section>
              ) : (
                <div className="responsibility-list">
                  {selectedTasks.map(
                    (task) => {
                      const details =
                        taskDetails[task];

                      if (!details) {
                        return null;
                      }

                      return (
                        <article
                          className="responsibility-card"
                          key={task}
                        >
                          <div>
                            <h3>
                              {task}
                            </h3>

                            <p>
                              Owner:{" "}
                              <strong>
                                {personName(
                                  details.ownerId
                                )}
                              </strong>
                            </p>

                            <p>
                              Usually done by:{" "}
                              <strong>
                                {personName(
                                  details.doerId
                                )}
                              </strong>
                            </p>
                          </div>

                          <div className="responsibility-meta">
                            <span>
                              {details.frequency}
                            </span>

                            <span>
                              {details.duration} min
                            </span>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              )}
            </>
          )}

          {appPage === "capture" && (
            <>
              <section className="app-page-heading">
                <p className="today-eyebrow">
                  CAPTURE
                </p>

                <h2>
                  Get it out of your head
                </h2>

                <p>
                  Remember something? Put it here now.
                  Organise it later.
                </p>
              </section>

              <section className="capture-box">
                <label className="capture-label">
                  <span>
                    What did you just remember?
                  </span>

                  <div className="capture-entry-row">
                    <input
                      type="text"
                      value={captureText}
                      placeholder="e.g. Buy dog food"
                      onChange={(event) =>
                        setCaptureText(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter"
                        ) {
                          addCaptureItem();
                        }
                      }}
                    />

                    <button
                      className="primary-button"
                      onClick={addCaptureItem}
                      disabled={
                        !captureText.trim()
                      }
                    >
                      Capture
                    </button>
                  </div>
                </label>

                <p className="capture-reassurance">
                  No organising required. Just capture it.
                </p>
              </section>

              {renderCaptureInbox()}

              <section className="capture-help-card">
                <strong>
                  Capture first. Decide later.
                </strong>

                <p>
                  When you are ready, choose Decide to
                  turn an Inbox item into a household
                  responsibility.
                </p>
              </section>
            </>
          )}

         {appPage === "helpstart" && (
  <>
    <section className="app-page-heading">
      <p className="today-eyebrow">
        HELP ME START
      </p>

      <h2>
        What feels manageable right now?
      </h2>

      <p>
        Pick the amount of capacity you have.
        Ourty will narrow things down so
        you do not have to scan the whole list.
      </p>
    </section>

    <section className="help-start-options">
      <button
        className="help-start-card"
        onClick={() =>
          chooseHelpStartTask("5")
        }
      >
        <span className="help-start-time">
          5
        </span>

        <div>
          <h3>
            I’ve got 5 minutes
          </h3>

          <p>
            Show me something small and achievable.
          </p>
        </div>
      </button>

      <button
        className="help-start-card"
        onClick={() =>
          chooseHelpStartTask("15")
        }
      >
        <span className="help-start-time">
          15
        </span>

        <div>
          <h3>
            I’ve got 15 minutes
          </h3>

          <p>
            Give me a useful job I can finish
            fairly quickly.
          </p>
        </div>
      </button>

      <button
        className="help-start-card low-energy"
        onClick={() =>
          chooseHelpStartTask("low")
        }
      >
        <span className="help-start-time">
          •
        </span>

        <div>
          <h3>
            I have almost no energy
          </h3>

          <p>
            Give me the smallest available next
            step.
          </p>
        </div>
      </button>
    </section>

    {helpStartChoice && (
      <section className="help-start-result">
        {helpStartChoice.error ? (
          <>
            <p className="today-eyebrow">
              NOTHING MATCHES YET
            </p>

            <h3>
              That is okay.
            </h3>

            <p>
              {helpStartChoice.error}
            </p>

            <button
              className="secondary-button"
              onClick={() =>
                setHelpStartChoice(null)
              }
            >
              Choose another option
            </button>
          </>
        ) : (
          <>
            <p className="today-eyebrow">
              JUST ONE THING
            </p>

            <h3>
              {helpStartChoice.task}
            </h3>

            <div className="help-start-result-meta">
              <span>
                {helpStartChoice.details.duration} min
              </span>

              <span>
                Usually done by{" "}
                {personName(
                  helpStartChoice.details.doerId
                )}
              </span>
            </div>

            <p>
              You do not need to think about the
              rest right now.
            </p>

            {!helpStartChoice.accepted && (
              <div className="help-start-result-actions">
                <button
                  className="secondary-button"
                  onClick={
                    giveAnotherHelpStartTask
                  }
                >
                  Give me another
                </button>

                <button
                  className="primary-button"
                  onClick={
                    acceptHelpStartTask
                  }
                >
                  I’ll do this
                </button>
              </div>
            )}

            {helpStartChoice.accepted && (
              <div className="help-start-accepted">
                <strong>
                  {helpStartChoice.completedToday
                    ? "Done — Ourty has marked it complete for today."
                    : "That is enough for now."}
                </strong>

                <p>
                  {helpStartChoice.completedToday
                    ? "You can see the update on your Today page."
                    : "This task is not scheduled for today, so Ourty has left your Today plan unchanged."}
                </p>

                {helpStartChoice.completedToday && (
                  <button
                    className="secondary-button"
                    onClick={() =>
                      setAppPage("today")
                    }
                  >
                    View Today
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </section>
    )}

    <section className="today-gentle-note">
      <strong>
        Doing one thing still counts.
      </strong>

      <p>
        The goal is to reduce the effort of
        deciding what to do next.
      </p>
    </section>
  </>
)}
          {appPage === "roomscan" && (
            <>
              <section className="app-page-heading">
                <p className="today-eyebrow">
                  ROOM SCAN
                </p>

                <h2>
                  Not sure where to start?
                </h2>

                <p>
                  Take or upload a photo of a room and
                  Ourty can help turn what you see
                  into a small, manageable list.
                </p>
              </section>

              <section className="room-scan-intro">
                <div className="room-scan-intro-icon">
                  ◎
                </div>

                <div>
                  <h3>
                    You stay in control.
                  </h3>

                  <p>
                    Room Scan suggests possible jobs.
                    Nothing is added, assigned or
                    scheduled unless you choose it.
                  </p>
                </div>
              </section>

              {!roomScanImage ? (
                <section className="room-upload-card">
                  <div className="room-upload-symbol">
                    +
                  </div>

                  <h3>
                    Add a room photo
                  </h3>

                  <p>
                    Take a new photo on your phone or
                    choose one you already have.
                  </p>

                  <label className="room-upload-button">
                    Choose or take photo

                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleRoomImage}
                    />
                  </label>
                </section>
              ) : (
                <>
                  <section className="room-preview-card">
                    <div className="room-preview-heading">
                      <div>
                        <p className="today-eyebrow">
                          YOUR PHOTO
                        </p>

                        <h3>
                          Ready to scan
                        </h3>
                      </div>

                      <button
                        className="room-change-button"
                        onClick={clearRoomScan}
                      >
                        Choose another
                      </button>
                    </div>

                    <div className="room-image-frame">
                      <img
                        src={roomScanImage}
                        alt="Room selected for scanning"
                      />
                    </div>

                    {!roomScanAnalysed && (
                      <div className="room-analyse-area">
                        <div>
                          <strong>
                            Ready to look for useful next
                            steps?
                          </strong>

                          <p>
                            Ourty will look at the
                            photo and suggest a few
                            practical next steps. Nothing
                            will be added unless you
                            choose it.
                          </p>
                        </div>

                        <button
                          className="primary-button room-analyse-button"
                          onClick={analyseRoomAI}
                          disabled={
                            roomScanLoading
                          }
                        >
                          {roomScanLoading
                            ? "Looking around…"
                            : "Analyse room"}
                        </button>
                      </div>
                    )}

                    {roomScanError && (
                      <div className="room-scan-error">
                        <strong>
                          Room Scan couldn't finish.
                        </strong>

                        <p>
                          {roomScanError}
                        </p>

                        <button
                          className="secondary-button"
                          onClick={analyseRoomAI}
                        >
                          Try again
                        </button>
                      </div>
                    )}
                  </section>

                  {roomScanAnalysed && (
                    <section className="room-results-section">
                      <div className="room-results-heading">
                        <div>
                          <p className="today-eyebrow">
                            SUGGESTIONS
                          </p>

                          <h3>
                            A few things you could do
                          </h3>

                          <p>
                            These are possibilities, not a
                            judgement about the room.
                          </p>
                        </div>

                        {roomScanSuggestions.length >
                          0 && (
                          <button
                            className="secondary-button"
                            onClick={
                              addAllRoomSuggestionsToCapture
                            }
                          >
                            Add all to Capture
                          </button>
                        )}
                      </div>

                      {roomScanSuggestions.length ===
                      0 ? (
                        <div className="room-results-empty">
                          <strong>
                            All suggestions captured.
                          </strong>

                          <p>
                            They are now waiting in your
                            Capture Inbox.
                          </p>

                          <button
                            className="primary-button"
                            onClick={() =>
                              setAppPage("capture")
                            }
                          >
                            Go to Capture
                          </button>
                        </div>
                      ) : (
                        <div className="room-suggestion-list">
                          {roomScanSuggestions.map(
                            (suggestion) => (
                              <article
                                className="room-suggestion-card"
                                key={suggestion.id}
                              >
                                <div className="room-suggestion-main">
                                  <div className="room-suggestion-tags">
                                    <span className="room-category-tag">
                                      {
                                        suggestion.category
                                      }
                                    </span>

                                    <span className="room-effort-tag">
                                      {
                                        suggestion.effort
                                      }
                                    </span>
                                  </div>

                                  <h4>
                                    {suggestion.task}
                                  </h4>
                                </div>

                                <button
                                  className="room-add-button"
                                  onClick={() =>
                                    addRoomSuggestionToCapture(
                                      suggestion
                                    )
                                  }
                                >
                                  Add to Capture
                                </button>
                              </article>
                            )
                          )}
                        </div>
                      )}

                      {roomScanSuggestions.length >
                        0 && (
                        <div className="room-one-thing">
                          <p className="today-eyebrow">
                            JUST ONE THING
                          </p>

                          <strong>
                            Want the smallest possible
                            starting point?
                          </strong>

                          <p>
                            Choose one Quick win and ignore
                            the rest for now.
                          </p>
                        </div>
                      )}
                    </section>
                  )}
                </>
              )}

              <section className="room-scan-safety">
                <strong>
                  Room Scan notices possibilities.
                </strong>

                <p>
                  Its purpose is to reduce
                  decision-making, not create pressure or
                  judgement.
                </p>
              </section>
            </>
          )}

          {appPage === "fairness" && (
            <>
              <section className="app-page-heading">
                <p className="today-eyebrow">
                  FAIRNESS
                </p>

                <h2>
                  How is the load distributed?
                </h2>

                <p>
                  Fair does not always mean equal.
                </p>
              </section>

              {selectedTasks.length === 0 ? (
                <section className="today-empty">
                  <h3>
                    Nothing to compare yet
                  </h3>

                  <p>
                    Fairness becomes more useful as
                    responsibilities are organised.
                  </p>
                </section>
              ) : (
                <>
                  <div className="fairness-people">
                    {people.map(
                      (person) => {
                        const data =
                          fairnessData[
                            person.id
                          ];

                        return (
                          <article
                            className="fairness-person-card"
                            key={person.id}
                          >
                            <div className="fairness-person-heading">
                              <span
                                className="fairness-person-dot"
                                style={{
                                  backgroundColor:
                                    person.colour,
                                }}
                              />

                              <h3>
                                {person.name}
                              </h3>
                            </div>

                            <div className="fairness-simple-grid">
                              <div>
                                <span>
                                  Time
                                </span>

                                <strong>
                                  {formatMinutes(
                                    data?.time || 0
                                  )}
                                </strong>
                              </div>

                              <div>
                                <span>
                                  Owns
                                </span>

                                <strong>
                                  {data?.ownership || 0}
                                </strong>
                              </div>

                              <div>
                                <span>
                                  Does
                                </span>

                                <strong>
                                  {data?.occurrences || 0}
                                </strong>
                              </div>
                            </div>
                          </article>
                        );
                      }
                    )}
                  </div>

                  <section className="fairness-observation">
                    <p className="fairness-eyebrow">
                      CURRENT PLAN
                    </p>

                    <h3>
                      A snapshot, not a judgement
                    </h3>

                    <p>
                      {getFairnessObservation()}
                    </p>
                  </section>
                </>
              )}
            </>
          )}

          {appPage === "household" && (
            <section className="coming-soon-card">
              <p className="today-eyebrow">
                HOUSEHOLD
              </p>

              <h2>
                Household settings
              </h2>

              <p>
                Add more detail whenever you feel ready.
              </p>

              {setupPath === "capture" && (
                <div className="build-later-box">
                  <strong>
                    Ready to build out your household?
                  </strong>

                  <p>
                    You can return to the full setup
                    whenever you want.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => {
                      setSetupComplete(false);
                      setSetupPath("full");
                      setStep(3);
                    }}
                  >
                    Build my household
                  </button>
                </div>
              )}

              <button
                className="secondary-button"
                onClick={() => {
                  setSetupComplete(false);
                  setStep(1);
                }}
              >
                Edit household people
              </button>
            </section>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="top-bar">
        <div className="top-inner">
          <div className="brand">
            OURTY
          </div>

          <h1>
            Our load. Our way. Our team. Ourty.
          </h1>
        </div>
      </header>

      <main className="page">
        {step === 1 && (
          <>
            <div className="step-pill">
              Step 1
            </div>

            <div className="intro">
              <h2>
                Who is in your household?
              </h2>

              <p>
                Add the people whose responsibilities
                you may want to share.
              </p>
            </div>

            <div className="people-list">
              {people.map((person) => (
                <div
                  className="person-card"
                  key={person.id}
                >
                  <div
                    className="person-dot"
                    style={{
                      backgroundColor:
                        person.colour,
                    }}
                  />

                  <label>
                    <span>
                      Name
                    </span>

                    <input
                      value={person.name}
                      onChange={(event) =>
                        renamePerson(
                          person.id,
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <button
                    className="danger-button"
                    disabled={
                      people.length === 1
                    }
                    onClick={() =>
                      removePerson(person.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              className="secondary-button"
              onClick={addPerson}
            >
              + Add another person
            </button>

            <div className="navigation">
              <span />

              <button
                className="primary-button"
                onClick={() =>
                  setStep(2)
                }
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="step-pill">
              Step 2
            </div>

            <div className="intro">
              <h2>
                How would you like to start?
              </h2>

              <p>
                You do not have to set up your whole
                household today.
              </p>
            </div>

            <section className="start-choice-grid">
              <button
                className="start-choice-card"
                onClick={chooseCaptureSetup}
              >
                <div className="start-choice-icon">
                  +
                </div>

                <div>
                  <p className="start-choice-eyebrow">
                    LOW EFFORT
                  </p>

                  <h3>
                    Start small with Capture
                  </h3>

                  <p>
                    Add a few things that are already in
                    your head. No assigning, scheduling
                    or organising required.
                  </p>

                  <span>
                    Best if setup feels overwhelming →
                  </span>
                </div>
              </button>

              <button
                className="start-choice-card"
                onClick={chooseFullSetup}
              >
                <div className="start-choice-icon">
                  ✓
                </div>

                <div>
                  <p className="start-choice-eyebrow">
                    FULL SETUP
                  </p>

                  <h3>
                    Build my household now
                  </h3>

                  <p>
                    Choose responsibilities, assign
                    ownership and build your weekly plan.
                  </p>

                  <span>
                    Set up the full system →
                  </span>
                </div>
              </button>
            </section>

            <section className="start-reassurance">
              <strong>
                Either choice is fine.
              </strong>

              <p>
                If you start with Capture, you can build
                the rest whenever you are ready.
              </p>
            </section>

            <div className="navigation">
              <button
                className="secondary-button"
                onClick={() =>
                  setStep(1)
                }
              >
                Back
              </button>
            </div>
          </>
        )}

        {step === 3 &&
          setupPath === "capture" && (
            <>
              <div className="step-pill">
                Start small
              </div>

              <div className="intro">
                <h2>
                  What's already in your head?
                </h2>

                <p>
                  Add as much or as little as you want.
                  Even one thing is enough.
                </p>
              </div>

              <section className="capture-first-box">
                <label className="capture-label">
                  <span>
                    Something I need to remember…
                  </span>

                  <div className="capture-entry-row">
                    <input
                      value={captureText}
                      placeholder="e.g. Buy dog food"
                      onChange={(event) =>
                        setCaptureText(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter"
                        ) {
                          addCaptureItem();
                        }
                      }}
                    />

                    <button
                      className="primary-button"
                      onClick={addCaptureItem}
                      disabled={
                        !captureText.trim()
                      }
                    >
                      Add
                    </button>
                  </div>
                </label>

                <p className="capture-reassurance">
                  No owner. No deadline. No decisions yet.
                </p>
              </section>

              {captureItems.length > 0 && (
                <section className="capture-first-list">
                  <p className="today-eyebrow">
                    CAPTURED
                  </p>

                  <h3>
                    Safely out of your head
                  </h3>

                  <div className="capture-list">
                    {captureItems.map(
                      (item) => (
                        <article
                          className="capture-item"
                          key={item.id}
                        >
                          <div className="capture-item-main">
                            <span className="capture-dot" />

                            <strong>
                              {item.text}
                            </strong>
                          </div>

                          <button
                            className="capture-remove-button"
                            onClick={() =>
                              removeCaptureItem(
                                item.id
                              )
                            }
                          >
                            Remove
                          </button>
                        </article>
                      )
                    )}
                  </div>
                </section>
              )}

              <section className="one-thing-box">
                <strong>
                  One thing is enough.
                </strong>

                <p>
                  You can keep adding things gradually
                  as they occur to you.
                </p>
              </section>

              <div className="navigation">
                <button
                  className="secondary-button"
                  onClick={setupBack}
                >
                  Back
                </button>

                <button
                  className="primary-button"
                  onClick={finishSetup}
                >
                  Start using Ourty
                </button>
              </div>
            </>
          )}

        {setupPath === "full" &&
          step === 3 && (
            <>
              <div className="step-pill">
                Step 3 of 8
              </div>

              <div className="intro">
                <h2>
                  Tell us about your household
                </h2>

                <p>
                  This helps Ourty show relevant
                  responsibility suggestions.
                </p>
              </div>

              <section className="form-section">
                <h3>
                  Rooms
                </h3>

                <div className="three-column">
                  <label>
                    <span>
                      Bedrooms
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={profile.bedrooms}
                      onChange={(event) =>
                        setProfile({
                          ...profile,
                          bedrooms:
                            Number(
                              event.target.value
                            ),
                        })
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Bathrooms
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={profile.bathrooms}
                      onChange={(event) =>
                        setProfile({
                          ...profile,
                          bathrooms:
                            Number(
                              event.target.value
                            ),
                        })
                      }
                    />
                  </label>

                  <label>
                    <span>
                      Living/lounge rooms
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={
                        profile.livingRooms
                      }
                      onChange={(event) =>
                        setProfile({
                          ...profile,
                          livingRooms:
                            Number(
                              event.target.value
                            ),
                        })
                      }
                    />
                  </label>
                </div>
              </section>

              <section className="form-section">
                <h3>
                  Other spaces
                </h3>

                <div className="check-grid">
                  {[
                    ["kitchen", "Kitchen"],
                    ["laundry", "Laundry room"],
                    ["garden", "Garden or yard"],
                    ["garage", "Garage"],
                    ["office", "Home office or study"],
                  ].map(([key, label]) => (
                    <label
                      className="check-card"
                      key={key}
                    >
                      <input
                        type="checkbox"
                        checked={
                          profile.features[key]
                        }
                        onChange={() =>
                          setProfile({
                            ...profile,
                            features: {
                              ...profile.features,
                              [key]:
                                !profile.features[key],
                            },
                          })
                        }
                      />

                      <span>
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {[
                ["children", "Children"],
                ["pets", "Pets"],
                ["vehicles", "Vehicles"],
              ].map(([field, title]) => (
                <section
                  className="form-section"
                  key={field}
                >
                  <h3>
                    {title}
                  </h3>

                  <div className="choice-row">
                    {["yes", "no"].map(
                      (value) => (
                        <button
                          key={value}
                          className={
                            profile[field] === value
                              ? "choice-button active"
                              : "choice-button"
                          }
                          onClick={() =>
                            setProfile({
                              ...profile,
                              [field]:
                                value,
                            })
                          }
                        >
                          {value === "yes"
                            ? "Yes"
                            : "No"}
                        </button>
                      )
                    )}
                  </div>
                </section>
              ))}

              <div className="navigation">
                <button
                  className="secondary-button"
                  onClick={setupBack}
                >
                  Back
                </button>

                <button
                  className="primary-button"
                  onClick={setupNext}
                >
                  Continue
                </button>
              </div>
            </>
          )}

        {setupPath === "full" &&
          step === 4 && (
            <>
              <div className="step-pill">
                Step 4 of 8
              </div>

              <div className="intro">
                <h2>
                  What keeps your life running?
                </h2>

                <p>
                  Choose individual jobs or choose all
                  inside any category.
                </p>
              </div>

              <div className="task-toolbar">
                <div className="selected-count">
                  <strong>
                    {selectedTasks.length}
                  </strong>{" "}
                  selected
                </div>

                <button
                  className="secondary-button"
                  onClick={clearAllSelections}
                >
                  Clear all selections
                </button>
              </div>

              <div className="task-library">
                {TASK_LIBRARY.map(
                  (section) => {
                    if (
                      !visibleSection(section)
                    ) {
                      return (
                        <section
                          className="task-section muted"
                          key={section.id}
                        >
                          <h3>
                            {section.title}
                          </h3>

                          <p>
                            You told us this does not
                            apply, so these suggestions
                            are hidden.
                          </p>
                        </section>
                      );
                    }

                    return (
                      <section
                        className="task-section"
                        key={section.id}
                      >
                        <div className="section-heading">
                          <div>
                            <h3>
                              {section.title}
                            </h3>

                            <p>
                              {section.description}
                            </p>
                          </div>

                          <button
                            className="section-button"
                            onClick={() =>
                              toggleWholeSection(
                                section
                              )
                            }
                          >
                            {sectionSelected(
                              section
                            )
                              ? "Clear section"
                              : "Choose all"}
                          </button>
                        </div>

                        <div className="task-grid">
                          {section.tasks.map(
                            (task) => (
                              <label
                                className="task-card"
                                key={task}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedTasks.includes(
                                    task
                                  )}
                                  onChange={() =>
                                    toggleTask(task)
                                  }
                                />

                                <span>
                                  {task}
                                </span>
                              </label>
                            )
                          )}
                        </div>

                        <div className="other-box">
                          <strong>
                            Something else?
                          </strong>

                          <p>
                            Add another responsibility
                            for this area.
                          </p>

                          <div className="other-row">
                            <input
                              value={
                                customInputs[
                                  section.id
                                ] || ""
                              }
                              onChange={(event) =>
                                setCustomInputs({
                                  ...customInputs,
                                  [section.id]:
                                    event.target.value,
                                })
                              }
                              placeholder={`Other ${section.title.toLowerCase()} task`}
                            />

                            <button
                              className="secondary-button"
                              onClick={() =>
                                addOtherTask(
                                  section.id
                                )
                              }
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  }
                )}
              </div>

              <div className="navigation">
                <button
                  className="secondary-button"
                  onClick={setupBack}
                >
                  Back
                </button>

                <button
                  className="primary-button"
                  disabled={
                    selectedTasks.length === 0
                  }
                  onClick={setupNext}
                >
                  Continue
                </button>
              </div>
            </>
          )}

        {setupPath === "full" &&
          step === 5 && (
            <>
              <div className="step-pill">
                Step 5 of 8
              </div>

              <div className="intro">
                <h2>
                  Set the details
                </h2>

                <p>
                  Decide who owns each responsibility
                  and who does it.
                </p>
              </div>

              <div className="info-box">
                <strong>
                  Owner and doer are different.
                </strong>

                <p>
                  The owner remembers and makes sure the
                  responsibility happens. The person
                  doing it can be someone else.
                </p>
              </div>

              <div className="details-list">
                {selectedTasks.map(
                  (task) => {
                    const details =
                      taskDetails[task];

                    if (!details) {
                      return null;
                    }

                    return (
                      <section
                        className="detail-card"
                        key={task}
                      >
                        <h3>
                          {task}
                        </h3>

                        <label className="field">
                          <span>
                            Who owns this responsibility?
                          </span>

                          <select
                            value={details.ownerId}
                            onChange={(event) =>
                              updateTask(
                                task,
                                "ownerId",
                                event.target.value
                              )
                            }
                          >
                            {people.map(
                              (person) => (
                                <option
                                  key={person.id}
                                  value={person.id}
                                >
                                  {person.name}
                                </option>
                              )
                            )}
                          </select>
                        </label>

                        <div className="mode-section">
                          <h4>
                            How is this job shared?
                          </h4>

                          <div className="mode-buttons">
                            <button
                              className={
                                details.mode === "one"
                                  ? "mode-button active"
                                  : "mode-button"
                              }
                              onClick={() =>
                                updateTask(
                                  task,
                                  "mode",
                                  "one"
                                )
                              }
                            >
                              <strong>
                                One person
                              </strong>

                              <span>
                                Same person normally does it.
                              </span>
                            </button>

                            <button
                              className={
                                details.mode === "days"
                                  ? "mode-button active"
                                  : "mode-button"
                              }
                              onClick={() =>
                                updateTask(
                                  task,
                                  "mode",
                                  "days"
                                )
                              }
                            >
                              <strong>
                                Choose the days
                              </strong>

                              <span>
                                Choose who does it each day.
                              </span>
                            </button>
                          </div>
                        </div>

                        {details.mode === "one" && (
                          <div className="panel">
                            <div className="two-column">
                              <label className="field">
                                <span>
                                  Who usually does it?
                                </span>

                                <select
                                  value={details.doerId}
                                  onChange={(event) =>
                                    updateTask(
                                      task,
                                      "doerId",
                                      event.target.value
                                    )
                                  }
                                >
                                  {people.map(
                                    (person) => (
                                      <option
                                        key={person.id}
                                        value={person.id}
                                      >
                                        {person.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </label>

                              <label className="field">
                                <span>
                                  How often?
                                </span>

                                <select
                                  value={
                                    details.frequency
                                  }
                                  onChange={(event) =>
                                    updateTask(
                                      task,
                                      "frequency",
                                      event.target.value
                                    )
                                  }
                                >
                                  {FREQUENCIES.map(
                                    (frequency) => (
                                      <option
                                        key={frequency}
                                      >
                                        {frequency}
                                      </option>
                                    )
                                  )}
                                </select>
                              </label>
                            </div>
                          </div>
                        )}

                        {details.mode === "days" && (
                          <div className="panel">
                            <div className="day-grid">
                              {DAYS.map(
                                (day) => (
                                  <label
                                    className="day-card"
                                    key={day}
                                  >
                                    <span>
                                      {day}
                                    </span>

                                    <select
                                      value={
                                        details.days[day]
                                      }
                                      onChange={(event) =>
                                        updateTaskDay(
                                          task,
                                          day,
                                          event.target.value
                                        )
                                      }
                                    >
                                      <option value="">
                                        Nobody
                                      </option>

                                      {people.map(
                                        (person) => (
                                          <option
                                            key={person.id}
                                            value={String(
                                              person.id
                                            )}
                                          >
                                            {person.name}
                                          </option>
                                        )
                                      )}

                                      {people.length > 1 && (
                                        <option value="together">
                                          Together
                                        </option>
                                      )}
                                    </select>
                                  </label>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        <label className="field duration-field">
                          <span>
                            About how long does it take each time?
                          </span>

                          <div className="duration-row">
                            <input
                              type="number"
                              min="1"
                              value={details.duration}
                              onChange={(event) =>
                                updateTask(
                                  task,
                                  "duration",
                                  Math.max(
                                    1,
                                    Number(
                                      event.target.value
                                    )
                                  )
                                )
                              }
                            />

                            <span>
                              minutes
                            </span>
                          </div>
                        </label>
                      </section>
                    );
                  }
                )}
              </div>

              <div className="navigation">
                <button
                  className="secondary-button"
                  onClick={setupBack}
                >
                  Back
                </button>

                <button
                  className="primary-button"
                  onClick={setupNext}
                >
                  Build my week
                </button>
              </div>
            </>
          )}

        {setupPath === "full" &&
          step === 6 && (
            <>
              <div className="step-pill">
                Step 6 of 8
              </div>

              <div className="intro">
                <h2>
                  Your weekly schedule
                </h2>

                <p>
                  Here is the week created from your choices.
                </p>
              </div>

              <div className="week-schedule">
                {DAYS.map((day) => {
                  const tasks =
                    getScheduleForDay(day);

                  return (
                    <article
                      className="schedule-day"
                      key={day}
                    >
                      <div className="schedule-day-heading">
                        <h3>
                          {day}
                        </h3>
                      </div>

                      {tasks.length === 0 ? (
                        <div className="empty-day">
                          Nothing scheduled.
                        </div>
                      ) : (
                        <div className="schedule-task-list">
                          {tasks.map(
                            (item, index) => (
                              <div
                                className="schedule-task"
                                key={`${day}-${item.task}-${index}`}
                              >
                                <div className="schedule-task-main">
                                  <strong>
                                    {item.task}
                                  </strong>

                                  <span>
                                    {item.duration} min
                                  </span>
                                </div>

                                <div className="schedule-person">
                                  {item.together
                                    ? "Together"
                                    : personName(
                                        item.personId
                                      )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="navigation">
                <button
                  className="secondary-button"
                  onClick={setupBack}
                >
                  Back
                </button>

                <button
                  className="primary-button"
                  onClick={setupNext}
                >
                  Check the balance
                </button>
              </div>
            </>
          )}

        {setupPath === "full" &&
          step === 7 && (
            <>
              <div className="step-pill">
                Step 7 of 8
              </div>

              <div className="intro">
                <h2>
                  How is the load distributed?
                </h2>

                <p>
                  Fair does not always mean equal.
                </p>
              </div>

              <div className="fairness-people">
                {people.map(
                  (person) => {
                    const data =
                      fairnessData[person.id];

                    return (
                      <article
                        className="fairness-person-card"
                        key={person.id}
                      >
                        <div className="fairness-person-heading">
                          <span
                            className="fairness-person-dot"
                            style={{
                              backgroundColor:
                                person.colour,
                            }}
                          />

                          <h3>
                            {person.name}
                          </h3>
                        </div>

                        <div className="fairness-simple-grid">
                          <div>
                            <span>
                              Time
                            </span>

                            <strong>
                              {formatMinutes(
                                data?.time || 0
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Owns
                            </span>

                            <strong>
                              {data?.ownership || 0}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Does
                            </span>

                            <strong>
                              {data?.occurrences || 0}
                            </strong>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>

              <section className="fairness-observation">
                <h3>
                  A snapshot, not a judgement
                </h3>

                <p>
                  {getFairnessObservation()}
                </p>
              </section>

              <div className="navigation">
                <button
                  className="secondary-button"
                  onClick={setupBack}
                >
                  Back
                </button>

                <button
                  className="primary-button"
                  onClick={setupNext}
                >
                  Review my plan
                </button>
              </div>
            </>
          )}

        {setupPath === "full" &&
          step === 8 && (
            <>
              <div className="step-pill">
                Step 8 of 8
              </div>

              <div className="intro">
                <h2>
                  Your Ourty plan
                </h2>

                <p>
                  Your household has a starting plan.
                  Nothing is locked in.
                </p>
              </div>

              <section className="review-hero">
                <p className="review-eyebrow">
                  YOUR HOUSEHOLD
                </p>

                <h3>
                  {people.length}{" "}
                  {people.length === 1
                    ? "person"
                    : "people"}
                  ,{" "}
                  {selectedTasks.length}{" "}
                  {selectedTasks.length === 1
                    ? "responsibility"
                    : "responsibilities"}
                </h3>

                <p>
                  Ourty has turned your choices into
                  a starting household plan.
                </p>
              </section>

              <section className="finish-box">
                <p className="review-eyebrow">
                  READY TO GO
                </p>

                <h3>
                  Your household has a starting plan.
                </h3>

                <p>
                  You can keep adjusting it as life changes.
                </p>
              </section>

              <div className="navigation">
                <button
                  className="secondary-button"
                  onClick={setupBack}
                >
                  Back
                </button>

                <button
                  className="primary-button"
                  onClick={finishSetup}
                >
                  Finish setup
                </button>
              </div>
            </>
          )}
      </main>
    </div>
  );
}

export default App;