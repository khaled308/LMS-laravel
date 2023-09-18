@extends('dashboard::layouts.main')

@section('content')
<section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <!-- general form elements -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Update Class</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form method="POST" action="{{route('classes.update', $class->id)}}">
                @csrf
                @method('put')
              <div class="card-body">
                <div class="form-group">
                  <label for="name">Class Name</label>
                  <input type="text" class="form-control" id="name" placeholder="Enter Admin Name" name="name" value="{{old('name', $class->name)}}">
                    @error('name')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="description">Class Description</label>
                    <textarea class="form-control" id="description" placeholder="Enter Class Description" name="description">{{old('description', $class->description)}}</textarea>
                    @error('description')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
              </div>
              <!-- /.card-body -->

              <div class="card-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
          <!-- /.card -->
        </div>
      </div>
      <!-- /.row -->
    </div><!-- /.container-fluid -->
  </section>
@endsection