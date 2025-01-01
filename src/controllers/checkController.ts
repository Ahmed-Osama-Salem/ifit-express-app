import { Request, Response } from "express";
import Posts from "../models/Blog";

const handleCheck = async (req: Request, res: Response) => {
  const data = [
    {
      title: "Solarbreeze",
      description: "Heat exposure on board fishing boat",
      date: "4/1/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Alpha",
      description: "Burn of third degree of left upper arm, initial encounter",
      date: "4/29/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Temp",
      description: "Other fracture of occiput, unspecified side, init",
      date: "8/8/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Stringtough",
      description: "Poisoning by oth opioids, accidental (unintentional), subs",
      date: "11/17/2022",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Gembucket",
      description: "Labor and delivery comp by vascular lesion of cord, unsp",
      date: "12/2/2022",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Flexidy",
      description:
        "Toxic effect of organophos and carbamate insect, asslt, init",
      date: "2/21/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Duobam",
      description:
        "Corros first deg mult right fngr (nail), not inc thumb, sqla",
      date: "10/20/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Keylex",
      description:
        "Complete traum amp at lev betw kn & ankl, unsp low leg, sqla",
      date: "2/7/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Vagram",
      description: "Other streptococcal arthritis, ankle and foot",
      date: "2/18/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "It",
      description: "Partial traumatic amputation of left breast, subs encntr",
      date: "8/22/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Alpha",
      description: "Laceration of popliteal artery, unspecified leg",
      date: "1/26/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Redhold",
      description: "Other and unspecified superficial injuries of throat",
      date: "4/15/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Matsoft",
      description: "Struck by volleyball, subsequent encounter",
      date: "4/11/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Holdlamis",
      description: "Ped on rolr-skt injured in collision w 2/3-whl mv nontraf",
      date: "4/22/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Lotlux",
      description: "Foreign body in ear, unspecified ear, subsequent encounter",
      date: "6/24/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Otcom",
      description: "Burn of second degree of right toe(s) (nail), sequela",
      date: "8/14/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Cardguard",
      description:
        "Poisoning by oth synthetic narcotics, undetermined, sequela",
      date: "6/28/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Fixflex",
      description: "Poisoning by anticoagulants, intentional self-harm",
      date: "8/18/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Y-find",
      description:
        "Minor laceration of unsp innominate or subclav vein, sequela",
      date: "10/4/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Span",
      description: "Fracture of superior rim of left pubis, init for clos fx",
      date: "6/2/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Opela",
      description: "Corrosion of unspecified degree of chest wall, subs encntr",
      date: "1/26/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Tempsoft",
      description: "Nondisp unsp condyle fx low end unsp femr, 7thR",
      date: "3/31/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Asoka",
      description: "Toxic effect of other pesticides",
      date: "9/17/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Solarbreeze",
      description: "Disorders of vagus nerve",
      date: "7/31/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Bytecard",
      description: "Stress fracture, left fibula, subs for fx w delay heal",
      date: "2/11/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Flowdesk",
      description: "Unsp pedl cyclst injured in clsn w unsp mv in traf, init",
      date: "10/3/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Zathin",
      description: "Stress fracture, pelvis and femur",
      date: "11/20/2022",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Ronstring",
      description: "Postthrombotic syndrome",
      date: "11/8/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Zamit",
      description:
        "Contus/lac/hem brnst w LOC w dth d/t oth cause bf consc,init",
      date: "10/6/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Otcom",
      description: "Contusion of ovary, bilateral, sequela",
      date: "6/16/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Greenlam",
      description: "Other specified leukemias, in remission",
      date: "10/30/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Opela",
      description: "Corrosion of third degree of right hand, unsp site, subs",
      date: "2/14/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Tin",
      description:
        "Unspecified injury of oth intrathoracic organs, init encntr",
      date: "12/18/2022",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Andalax",
      description: "Spontaneous rupture of flexor tendons, right thigh",
      date: "7/5/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Sonsing",
      description: "Contact with kitchen utensil",
      date: "12/31/2022",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Y-find",
      description: "Complications of corneal transplant",
      date: "2/18/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Cookley",
      description: "Drown due to fishing boat overturning, subs",
      date: "4/29/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Pannier",
      description:
        "Unsp fx upr end l ulna, subs for opn fx type I/2 w malunion",
      date: "1/2/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Greenlam",
      description:
        "Ped on rolr-skt inj pick-up truck, pk-up/van, unsp, sequela",
      date: "9/28/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Vagram",
      description: "Displ transverse fx shaft of unsp fibula, 7thE",
      date: "11/25/2022",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Konklab",
      description: "Persistent postprocedural fistula",
      date: "10/28/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Flowdesk",
      description: "Blister (nonthermal), right ankle, sequela",
      date: "3/17/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Flowdesk",
      description: "Other superficial bite of vagina and vulva, subs encntr",
      date: "5/15/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
    {
      title: "Domainer",
      description: "Other diseases of spleen",
      date: "7/1/2023",
      author: "admin",
      content: "Burn of third degree of left upper arm, initial encounter",
    },
  ];

  async function seedData() {
    try {
      const zxc = await Posts.insertMany(data);
      console.log(zxc);
    } catch (error) {
      console.error("Error seeding data:", error);
    } finally {
      // Disconnect from the database
    }
  }

  seedData();

  return res.status(200).send("Working");
};
export default handleCheck;
