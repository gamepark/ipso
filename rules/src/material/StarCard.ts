import { getEnumValues } from "@gamepark/rules-api";

export enum StarCard {
  StarCard1 = 1,
  StarCard2,
  StarCard3,
  StarCard4,
  StarCard5,
  StarCard6
}

export const starCards = getEnumValues(StarCard)