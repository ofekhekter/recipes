import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      id: [null],
      title: [''],
      ingredients: [''],
      instructions: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.recipeService.getRecipe(Number(id)).subscribe((recipe: Recipe) => {
        this.recipeForm.patchValue(recipe);
      });
    }
  }

  onSubmit(): void {
    const recipe = this.recipeForm.value as Recipe;
    if (this.isEditMode) {
      this.recipeService.updateRecipe(recipe).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.recipeService.addRecipe(recipe).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
