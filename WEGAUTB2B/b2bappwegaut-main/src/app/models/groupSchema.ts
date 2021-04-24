
export interface GroupsSchema2 {
    _id:          string;
    messages:     Message[];
    groupMembers: GroupMember[];
    nameChat:     string;
    createdAt:    Date;
    updatedAt:    Date;
    group:        string;

}

export interface GroupMember {
    _id:       string;
    name:      string;
    email:     string;
    createdAt: Date;
    updatedAt: Date;
}

 export interface Message {
    urlFile:        string;
    _id:            string;
    user:           string;
    messageContent: string;
    createdAt:      Date;
    updatedAt:      Date;
}
