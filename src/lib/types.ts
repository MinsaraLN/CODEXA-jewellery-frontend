export type ID = string | number;


export interface Category {
id: ID;
name: string;
slug: string;
// Some backends expose kind/type or boolean for gems. We support both.
kind?: "PRODUCT" | "GEM" | string;
type?: "PRODUCT" | "GEM" | string;
isGem?: boolean;
}


export interface ProductImage {
id?: ID;
url: string;
alt?: string;
}


export interface Product {
id: ID;
slug: string;
title: string;
sku: string;
images: string[] | ProductImage[];
price?: number;
metalPurity?: string;
weight?: string;
rating?: number;
badges?: string[];
collection?: string;
category?: string; // display name (optional)
categoryId?: ID;
}


export interface Gem {
id: ID;
name: string;
slug: string;
image?: string;
images?: string[];
color?: string;
cut?: string;
clarity?: string;
carat?: string | number;
origin?: string;
category?: string; // display name (optional)
categoryId?: ID;
}


export type Paged<T> = {
content: T[];
totalElements: number;
totalPages: number;
page: number;
size: number;
};