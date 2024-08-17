import 'package:flutter/material.dart';

class CategoryModel {
  String name;
  Color boxColor;

  CategoryModel({required this.name, required this.boxColor});

  static List<CategoryModel> getCategories() {
    List<CategoryModel> categories = [];
    categories.add(CategoryModel(name: 'Breakfast', boxColor: Colors.green));
    categories.add(CategoryModel(name: 'Lunch', boxColor: Colors.red));
    categories.add(CategoryModel(name: 'Dinner', boxColor: Colors.blue));

    return categories;
  }
}
